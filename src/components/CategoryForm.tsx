import { useState, useEffect } from 'react';
import { Plus, Check, X } from 'phosphor-react';

interface Categoria {
  id: string;
  name: string;
}

interface CategoryFormProps {
  onAdd: (name: string) => Promise<void>;
  isAdding: boolean;
  editingCategoria?: Categoria | null;
  onCancelEdit?: () => void;
}

function CategoryForm({
  onAdd,
  isAdding,
  editingCategoria,
  onCancelEdit
}: CategoryFormProps) {
  const [novaCategoria, setNovaCategoria] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (editingCategoria) {
      setNovaCategoria(editingCategoria.name);
      setError(null);
    } else {
      setNovaCategoria('');
      setError(null);
    }
  }, [editingCategoria]);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const value = novaCategoria.trim();

    if (!value) {
      setError('Informe um nome para a categoria.');
      return;
    }
    if (value.length < 2) {
      setError('O nome deve ter pelo menos 2 caracteres.');
      return;
    }

    setError(null);
    await onAdd(value);
    // se não estiver editando, limpa após adicionar
    if (!editingCategoria) setNovaCategoria('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <label htmlFor="categoriaNome" className="text-sm font-medium text-gray-700 block">
        Nome da categoria
      </label>

      <div>
        <input
          id="categoriaNome"
          type="text"
          value={novaCategoria}
          onChange={(e) => { setNovaCategoria(e.target.value); if (error) setError(null); }}
          className={`w-full border rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-purple-500 ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Ex.: Acessórios"
          autoComplete="off"
          inputMode="text"
          maxLength={60}
          aria-invalid={!!error}
          aria-describedby={error ? 'categoria-erro' : undefined}
          disabled={isAdding}
        />
        {error && (
          <p id="categoria-erro" className="text-red-500 text-xs mt-1">
            {error}
          </p>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        <button
          type="submit"
          disabled={isAdding}
          className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 disabled:opacity-60 text-white flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition"
          aria-label={editingCategoria ? 'Salvar alterações' : 'Adicionar categoria'}
        >
          {isAdding ? (
            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0a12 12 0 00-12 12h4z"/>
            </svg>
          ) : editingCategoria ? (
            <>
              <Check size={18} weight="bold" />
              Salvar Alterações
            </>
          ) : (
            <>
              <Plus size={18} weight="bold" />
              Adicionar Categoria
            </>
          )}
        </button>

        {editingCategoria && onCancelEdit && (
          <button
            type="button"
            onClick={onCancelEdit}
            disabled={isAdding}
            className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-800 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition disabled:opacity-60"
            aria-label="Cancelar edição"
          >
            <X size={16} />
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

export default CategoryForm;

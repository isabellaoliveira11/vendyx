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

  useEffect(() => {
    if (editingCategoria) {
      setNovaCategoria(editingCategoria.name);
    } else {
      setNovaCategoria('');
    }
  }, [editingCategoria]);

  const handleSubmit = async () => {
    if (!novaCategoria.trim()) return;

    await onAdd(novaCategoria);
    setNovaCategoria('');
  };

  return (
    <div className="space-y-4">
      <label className="text-sm font-medium text-gray-700 block">
        Nome da categoria
      </label>
      <input
        type="text"
        value={novaCategoria}
        onChange={(e) => setNovaCategoria(e.target.value)}
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-purple-500"
        placeholder="Nome da categoria"
      />

      <div className="flex items-center gap-2">
        <button
          onClick={handleSubmit}
          disabled={isAdding}
          className="w-full bg-purple-500 hover:bg-purple-600 text-white flex items-center justify-center gap-2 px-4 py-2 rounded transition"
        >
          {editingCategoria ? (
            <>
              <Check size={18} weight="bold" />
              {isAdding ? 'Salvando...' : 'Salvar Alterações'}
            </>
          ) : (
            <>
              <Plus size={18} weight="bold" />
              {isAdding ? 'Adicionando...' : 'Adicionar Categoria'}
            </>
          )}
        </button>

        {editingCategoria && onCancelEdit && (
          <button
            onClick={onCancelEdit}
            className="text-sm text-gray-500 underline"
          >
            <X size={16} /> Cancelar
          </button>
        )}
      </div>
    </div>
  );
}

export default CategoryForm;

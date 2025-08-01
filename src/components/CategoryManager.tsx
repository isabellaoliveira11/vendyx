import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Plus,
  SpinnerGap,
  Trash,
  PencilSimple,
  Check,
  X,
} from 'phosphor-react';

interface Categoria {
  id: string;
  name: string;
}

function CategoryManager() {
  const [novaCategoria, setNovaCategoria] = useState('');
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [nomeEditado, setNomeEditado] = useState('');

  const fetchCategorias = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3333/categories');
      setCategorias(response.data);
    } catch (err) {
      console.error('Erro ao buscar categorias', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  const adicionarCategoria = async () => {
    if (!novaCategoria.trim()) return;
    setIsAdding(true);
    try {
      const response = await axios.post('http://localhost:3333/categories', {
        name: novaCategoria.trim(),
      });
      setCategorias([...categorias, response.data]);
      setNovaCategoria('');
    } catch (err: any) {
      alert(err.response?.data?.error || 'Erro ao adicionar categoria');
    } finally {
      setIsAdding(false);
    }
  };

  const removerCategoria = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja remover esta categoria?')) return;
    try {
      await axios.delete(`http://localhost:3333/categories/${id}`);
      setCategorias(categorias.filter((c) => c.id !== id));
    } catch (err) {
      alert('Erro ao remover categoria');
    }
  };

  const iniciarEdicao = (id: string, nomeAtual: string) => {
    setEditandoId(id);
    setNomeEditado(nomeAtual);
  };

  const cancelarEdicao = () => {
    setEditandoId(null);
    setNomeEditado('');
  };

  const salvarEdicao = async (id: string) => {
    if (!nomeEditado.trim()) return;
    try {
      const response = await axios.put(`http://localhost:3333/categories/${id}`, {
        name: nomeEditado.trim(),
      });
      setCategorias(
        categorias.map((cat) =>
          cat.id === id ? { ...cat, name: response.data.name } : cat
        )
      );
      cancelarEdicao();
    } catch (err: any) {
      alert(err.response?.data?.error || 'Erro ao atualizar categoria');
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-xl space-y-8 border border-gray-100 max-w-3xl mx-auto">
 
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Nova categoria"
          value={novaCategoria}
          onChange={(e) => setNovaCategoria(e.target.value)}
        />
        <button
          onClick={adicionarCategoria}
          disabled={isAdding || !novaCategoria.trim()}
          className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {isAdding ? (
            <SpinnerGap className="animate-spin" size={20} />
          ) : (
            <Plus size={20} />
          )}
          {isAdding ? 'Adicionando...' : 'Adicionar'}
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-100 shadow-sm">
        {loading ? (
          <div className="flex justify-center items-center h-40 text-gray-500">
            <SpinnerGap className="animate-spin" size={28} />
            <span className="ml-3 text-lg">Carregando categorias...</span>
          </div>
        ) : (
          <table className="w-full text-sm text-gray-700 divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr className="text-left text-purple-700 uppercase text-xs font-semibold tracking-wide">
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Nome</th>
                <th className="py-3 px-4">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {categorias.length > 0 ? (
                categorias.map((cat, index) => (
                  <tr key={cat.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4">
                      {editandoId === cat.id ? (
                        <input
                          className="border border-purple-300 px-2 py-1 rounded-md w-full text-sm"
                          value={nomeEditado}
                          onChange={(e) => setNomeEditado(e.target.value)}
                        />
                      ) : (
                        <span className="font-medium text-gray-800">{cat.name}</span>
                      )}
                    </td>
                    <td className="py-3 px-4 flex gap-2">
                      {editandoId === cat.id ? (
                        <>
                          <button
                            onClick={() => salvarEdicao(cat.id)}
                            className="text-green-600 hover:text-green-800"
                            title="Salvar"
                          >
                            <Check size={20} />
                          </button>
                          <button
                            onClick={cancelarEdicao}
                            className="text-gray-500 hover:text-gray-700"
                            title="Cancelar"
                          >
                            <X size={20} />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => iniciarEdicao(cat.id, cat.name)}
                            className="text-blue-600 hover:text-blue-800"
                            title="Editar"
                          >
                            <PencilSimple size={20} />
                          </button>
                          <button
                            onClick={() => removerCategoria(cat.id)}
                            className="text-red-500 hover:text-red-700"
                            title="Remover"
                          >
                            <Trash size={20} />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="text-center py-6 text-gray-500 italic">
                    Nenhuma categoria encontrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default CategoryManager;

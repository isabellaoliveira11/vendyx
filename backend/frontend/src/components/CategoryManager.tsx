import { useEffect, useState } from 'react';
import axios from 'axios';
import { Plus, SpinnerGap, Tag } from 'phosphor-react';
import CategoryTable from '../components/CategoryTable';
import { API_URL } from '../config/api';

interface Categoria {
  id: string;
  name: string;
}

export default function CategoryManager() {
  const [novaCategoria, setNovaCategoria] = useState('');
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [nomeEditado, setNomeEditado] = useState('');

  const fetchCategorias = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/categories`);
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
    const nome = novaCategoria.trim();
    if (!nome) return;

    setIsAdding(true);
    try {
      const response = await axios.post(`${API_URL}/categories`, { name: nome });
      setCategorias((prev) => [...prev, response.data]);
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
      await axios.delete(`${API_URL}/categories/${id}`);
      setCategorias((prev) => prev.filter((c) => c.id !== id));
    } catch {
      alert('Erro ao remover categoria');
    }
  };

  const iniciarEdicao = (id: string, nomeAtual: string) => {
    setEditandoId(id);
    setNomeEditado(nomeAtual);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelarEdicao = () => {
    setEditandoId(null);
    setNomeEditado('');
  };

  const salvarEdicao = async (id: string) => {
    const nome = nomeEditado.trim();
    if (!nome) return;

    try {
      const response = await axios.put(`${API_URL}/categories/${id}`, { name: nome });
      setCategorias((prev) =>
        prev.map((cat) => (cat.id === id ? { ...cat, name: response.data.name } : cat))
      );
      cancelarEdicao();
    } catch (err: any) {
      alert(err.response?.data?.error || 'Erro ao atualizar categoria');
    }
  };

  return (
    <div className="p-4 lg:p-6 w-full max-w-2xl">
      {/* Título */}
      <div className="flex items-center gap-3 mb-1">
        <Tag size={28} className="text-purple-700" />
        <h2 className="text-2xl font-bold text-gray-800">Categorias</h2>
      </div>

      <p className="text-sm text-gray-600 mb-4 -mt-1">
        Atualmente há{' '}
        <span className="text-purple-700 font-semibold">{categorias.length} categorias</span> cadastradas no sistema.
      </p>

      {/* Card: adicionar/editar */}
      <div className="bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-purple-100 flex flex-col sm:flex-row gap-2 items-center mb-5">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder={editandoId ? 'Editar nome da categoria' : 'Nova categoria'}
          value={editandoId ? nomeEditado : novaCategoria}
          onChange={(e) => (editandoId ? setNomeEditado(e.target.value) : setNovaCategoria(e.target.value))}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              editandoId ? salvarEdicao(editandoId) : adicionarCategoria();
            }
          }}
        />

        {editandoId ? (
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={() => salvarEdicao(editandoId)}
              disabled={!nomeEditado.trim()}
              className="flex-1 sm:flex-none bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-lg font-medium disabled:opacity-50 transition"
            >
              Salvar alterações
            </button>
            <button
              onClick={cancelarEdicao}
              className="flex-1 sm:flex-none bg-gray-100 hover:bg-gray-200 text-gray-800 px-5 py-2.5 rounded-lg font-medium transition"
            >
              Cancelar
            </button>
          </div>
        ) : (
          <button
            onClick={adicionarCategoria}
            disabled={isAdding || !novaCategoria.trim()}
            className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {isAdding ? <SpinnerGap className="animate-spin" size={20} /> : <Plus size={20} />}
            {isAdding ? 'Adicionando...' : 'Adicionar Categoria'}
          </button>
        )}
      </div>

      {/* Tabela */}
      <CategoryTable
        categorias={categorias}
        loading={loading}
        editandoId={editandoId}
        nomeEditado={nomeEditado}
        setNomeEditado={setNomeEditado}
        iniciarEdicao={iniciarEdicao}
        cancelarEdicao={cancelarEdicao}
        salvarEdicao={salvarEdicao}
        removerCategoria={removerCategoria}
      />
    </div>
  );
}

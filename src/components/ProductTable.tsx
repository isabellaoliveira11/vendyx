import { useState } from 'react';

export interface Produto {
  id: number;
  nome: string;
  preco: number;
  categoria: string;
  quantidade: number;
  status: 'Disponível' | 'Indisponível';
}

const produtosFake: Produto[] = [
  { id: 1, nome: 'Notebook Gamer', preco: 4500, categoria: 'Eletrônicos', quantidade: 5, status: 'Disponível' },
  { id: 2, nome: 'Mouse Sem Fio', preco: 120, categoria: 'Periféricos', quantidade: 10, status: 'Disponível' },
  { id: 3, nome: 'Cadeira Gamer', preco: 900, categoria: 'Móveis', quantidade: 0, status: 'Indisponível' },
];

export const ProductTable = () => {
  const [busca, setBusca] = useState('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todas');

  const categorias = ['Todas', ...new Set(produtosFake.map(p => p.categoria))];

  const produtosFiltrados = produtosFake.filter(p => {
    const nomeMatch = p.nome.toLowerCase().includes(busca.toLowerCase());
    const categoriaMatch = categoriaSelecionada === 'Todas' || p.categoria === categoriaSelecionada;
    return nomeMatch && categoriaMatch;
  });

  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold text-purple-800 mb-4">Lista de Produtos</h2>

      {/* Filtros */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Pesquisar por nome"
          className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />

        <select
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={categoriaSelecionada}
          onChange={(e) => setCategoriaSelecionada(e.target.value)}
        >
          {categorias.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Tabela */}
      <table className="w-full text-sm text-gray-700">
        <thead>
          <tr className="text-purple-600 border-b">
            <th className="py-2 text-left">id/nome</th>
            <th className="py-2 text-left">categoria</th>
            <th className="py-2 text-left">disponíveis</th>
            <th className="py-2 text-left">valor</th>
            <th className="py-2 text-left">status</th>
            <th className="py-2 text-left">ações</th>
          </tr>
        </thead>
        <tbody>
          {produtosFiltrados.map((produto) => (
            <tr key={produto.id} className="border-b hover:bg-purple-50">
              <td className="py-2">{produto.id}/{produto.nome}</td>
              <td>{produto.categoria}</td>
              <td>{produto.quantidade}</td>
              <td>R${produto.preco}</td>
              <td className={produto.status === 'Disponível' ? 'text-green-600' : 'text-red-600'}>
                {produto.status}
              </td>
              <td>
                <button className="text-purple-600 hover:text-purple-800 mr-2">✏️</button>
                <button className="text-red-500 hover:text-red-700">🗑</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

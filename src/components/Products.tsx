import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { ProductTable } from '../components/ProductTable';
import { useState } from 'react';

function Products() {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [categoria, setCategoria] = useState('');
  const [categorias, setCategorias] = useState<string[]>(['Eletrônicos', 'Periféricos']);
  const [novaCategoria, setNovaCategoria] = useState('');

  const adicionarCategoria = () => {
    if (novaCategoria && !categorias.includes(novaCategoria)) {
      setCategorias(prev => [...prev, novaCategoria]);
      setNovaCategoria('');
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-orange-50">
        <Sidebar />

        <main className="ml-60 flex-1 p-6">
          <h2 className="text-2xl font-bold text-orange-700 mb-4">Produtos e categorias</h2>
          <p className="text-sm text-gray-600 mb-6">
            Atualmente há 3 produtos cadastrados e disponíveis
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {/* FORMULÁRIO DE PRODUTO */}
            <div className="bg-white p-4 rounded shadow-md">
              <h3 className="text-lg font-semibold text-orange-600 mb-3">Adicionar Novo Produto</h3>

              <input
                type="text"
                placeholder="Digite o nome"
                className="w-full mb-2 p-2 border rounded"
                value={nome}
                onChange={e => setNome(e.target.value)}
              />
              <input
                type="number"
                placeholder="Digite o valor"
                className="w-full mb-2 p-2 border rounded"
                value={preco}
                onChange={e => setPreco(e.target.value)}
              />
              <input
                type="number"
                placeholder="Digite a quantidade"
                className="w-full mb-2 p-2 border rounded"
                value={quantidade}
                onChange={e => setQuantidade(e.target.value)}
              />
              <select
                className="w-full mb-2 p-2 border rounded"
                value={categoria}
                onChange={e => setCategoria(e.target.value)}
              >
                <option value="">Selecione a categoria</option>
                {categorias.map((cat, i) => (
                  <option key={i} value={cat}>{cat}</option>
                ))}
              </select>

              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded">
                + Novo Produto
              </button>
            </div>

            {/* TABELA DE PRODUTOS */}
            <div className="md:col-span-2">
              <ProductTable />
            </div>
          </div>

          {/* GERENCIAR CATEGORIAS */}
          <div className="mt-8 bg-white p-4 rounded shadow-md max-w-md">
            <h3 className="text-lg font-semibold text-orange-600 mb-3">Gerenciar categorias</h3>

            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="Digite o nome"
                className="w-full p-2 border rounded"
                value={novaCategoria}
                onChange={(e) => setNovaCategoria(e.target.value)}
              />
              <button
                onClick={adicionarCategoria}
                className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
              >
                + Nova categoria
              </button>
            </div>

            <table className="w-full text-sm">
              <thead>
                <tr className="text-orange-600 border-b">
                  <th className="py-2 text-left">ID</th>
                  <th className="text-left">Nome</th>
                </tr>
              </thead>
              <tbody>
                {categorias.map((cat, i) => (
                  <tr key={i} className="border-b hover:bg-orange-50">
                    <td className="py-2">{i + 1}</td>
                    <td>{cat}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </>
  );
}

export default Products;

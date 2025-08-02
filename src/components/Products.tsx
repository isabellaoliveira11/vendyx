import { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import ProductTable from '../components/ProductTable';

function Products() {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [categoria, setCategoria] = useState('');
  const [categorias, setCategorias] = useState<string[]>(['Eletrônicos', 'Periféricos']);
  const [novaCategoria, setNovaCategoria] = useState('');
  const [busca, setBusca] = useState(''); // ✅ Estado da busca

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

        <main className="ml-60 flex-1 p-8">
          <header className="mb-10">
            <h2 className="text-3xl font-extrabold text-orange-700 mb-2">Gerenciar Produtos</h2>
            <p className="text-gray-600 text-sm">Adicione produtos, veja a lista e gerencie categorias</p>
          </header>

          {/* CAMPO DE BUSCA */}
          <div className="mb-6 max-w-md">
            <input
              type="text"
              placeholder="🔍 Buscar produto por nome..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
            />
          </div>

          <div className="grid xl:grid-cols-3 gap-8">
            {/* FORMULÁRIO DE PRODUTO */}
            <div className="bg-white p-6 rounded-xl shadow-md border">
              <h3 className="text-xl font-semibold text-orange-600 mb-4">Adicionar Produto</h3>

              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Nome do produto"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
                  value={nome}
                  onChange={e => setNome(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Preço (R$)"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
                  value={preco}
                  onChange={e => setPreco(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Quantidade em estoque"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
                  value={quantidade}
                  onChange={e => setQuantidade(e.target.value)}
                />
                <select
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-orange-400 outline-none"
                  value={categoria}
                  onChange={e => setCategoria(e.target.value)}
                >
                  <option value="">Selecione a categoria</option>
                  {categorias.map((cat, i) => (
                    <option key={i} value={cat}>{cat}</option>
                  ))}
                </select>

                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition">
                  + Adicionar Produto
                </button>
              </div>
            </div>

            {/* TABELA DE PRODUTOS */}
            <div className="xl:col-span-2">
              <ProductTable busca={busca} /> {/* ✅ Prop obrigatória passada */}
            </div>
          </div>

          {/* GERENCIAR CATEGORIAS */}
          <div className="mt-12 bg-white p-6 rounded-xl shadow-md border max-w-xl">
            <h3 className="text-xl font-semibold text-orange-600 mb-4">Categorias</h3>

            <div className="flex gap-3 mb-5">
              <input
                type="text"
                placeholder="Nova categoria"
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
                value={novaCategoria}
                onChange={(e) => setNovaCategoria(e.target.value)}
              />
              <button
                onClick={adicionarCategoria}
                className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-lg"
              >
                + Adicionar
              </button>
            </div>

            <table className="w-full text-sm border-t">
              <thead>
                <tr className="text-orange-700 text-left border-b">
                  <th className="py-2">#</th>
                  <th>Nome da Categoria</th>
                </tr>
              </thead>
              <tbody>
                {categorias.map((cat, i) => (
                  <tr key={i} className="border-b hover:bg-orange-50">
                    <td className="py-2 font-medium text-gray-700">{i + 1}</td>
                    <td className="text-gray-800">{cat}</td>
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

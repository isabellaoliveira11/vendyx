import { useState } from 'react';

function ProductForm() {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [categoria, setCategoria] = useState('');

  const adicionarProduto = () => {
    // Aqui você depois salva no banco
    console.log({ nome, preco, quantidade, categoria });
    setNome('');
    setPreco('');
    setQuantidade('');
    setCategoria('');
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <h3 className="text-lg font-semibold text-purple-800 mb-4">Adicionar Novo Produto</h3>

      <div className="grid gap-3">
        <input
          type="text"
          placeholder="Digite o nome"
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="text"
          placeholder="Digite o valor"
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
        />
        <input
          type="text"
          placeholder="Digite a quantidade"
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
        />
        <input
          type="text"
          placeholder="Selecione a categoria"
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        />

        <button
          onClick={adicionarProduto}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded-md transition"
        >
          + Novo Produto
        </button>
      </div>
    </div>
  );
}

export default ProductForm;

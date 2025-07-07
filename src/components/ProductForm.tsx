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
    <div className="bg-white rounded shadow p-4">
      <h3 className="text-lg font-semibold text-orange-600 mb-3">Adicionar Novo Produto</h3>

      <div className="grid gap-3">
        <input
          type="text"
          placeholder="Digite o nome"
          className="border rounded p-2"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="text"
          placeholder="Digite o valor"
          className="border rounded p-2"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
        />
        <input
          type="text"
          placeholder="Digite a quantidade"
          className="border rounded p-2"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
        />
        <input
          type="text"
          placeholder="Selecione a categoria"
          className="border rounded p-2"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        />

        <button
          onClick={adicionarProduto}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
        >
          + Novo Produto
        </button>
      </div>
    </div>
  );
}

export default ProductForm;

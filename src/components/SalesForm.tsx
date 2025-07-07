import { useState } from 'react';

interface Produto {
  id: number;
  nome: string;
  preco: number;
}

const produtosFake: Produto[] = [
  { id: 1, nome: 'Produto 1', preco: 100 },
  { id: 2, nome: 'Produto 2', preco: 200 },
  { id: 3, nome: 'Produto 3', preco: 100 },
];

function SaleForm() {
  const [produtoSelecionado, setProdutoSelecionado] = useState<number>(1);
  const [quantidade, setQuantidade] = useState<number>(1);
  const [carrinho, setCarrinho] = useState<{ produto: Produto; quantidade: number }[]>([]);
  const [pagamento, setPagamento] = useState<string>('pix');
  const [observacao, setObservacao] = useState('');
  const [desconto, setDesconto] = useState<number>(0);

  const adicionarAoCarrinho = () => {
    const produto = produtosFake.find(p => p.id === produtoSelecionado);
    if (!produto) return;
    setCarrinho(prev => [...prev, { produto, quantidade }]);
  };

  const removerItem = (index: number) => {
    const novoCarrinho = [...carrinho];
    novoCarrinho.splice(index, 1);
    setCarrinho(novoCarrinho);
  };

  const total = carrinho.reduce((acc, item) => acc + item.produto.preco * item.quantidade, 0);
  const totalComDesconto = total - desconto;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full border border-purple-200">
      <h3 className="text-xl font-semibold text-purple-700 mb-4 text-center">
        Criar Nova Venda
      </h3>

      {/* Adicionar produto */}
      <div className="flex gap-4 items-end mb-6 flex-wrap">
        <div>
          <label className="block text-sm font-medium text-gray-700">Produto</label>
          <select
            className="border rounded-md p-2 w-40"
            value={produtoSelecionado}
            onChange={(e) => setProdutoSelecionado(Number(e.target.value))}
          >
            {produtosFake.map(produto => (
              <option key={produto.id} value={produto.id}>
                {produto.nome}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Quantidade</label>
          <input
            type="number"
            className="border rounded-md p-2 w-20"
            value={quantidade}
            min={1}
            onChange={(e) => setQuantidade(Number(e.target.value))}
          />
        </div>

        <button
          onClick={adicionarAoCarrinho}
          className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition"
        >
          Adicionar
        </button>
      </div>

      {/* Tabela de produtos no carrinho */}
      <table className="w-full text-sm border-separate border-spacing-y-1">
        <thead>
          <tr className="text-left text-purple-700">
            <th className="bg-purple-100 px-2 py-1 rounded-l">Produto</th>
            <th className="bg-purple-100 px-2 py-1">Qtd.</th>
            <th className="bg-purple-100 px-2 py-1">Unitário</th>
            <th className="bg-purple-100 px-2 py-1">Total</th>
            <th className="bg-purple-100 px-2 py-1 rounded-r">Ações</th>
          </tr>
        </thead>
        <tbody>
          {carrinho.map((item, index) => (
            <tr key={index} className="bg-purple-50 hover:bg-purple-100 transition rounded">
              <td className="px-2 py-1">{item.produto.nome}</td>
              <td className="px-2 py-1">{item.quantidade}</td>
              <td className="px-2 py-1">R$ {item.produto.preco.toFixed(2)}</td>
              <td className="px-2 py-1">R$ {(item.produto.preco * item.quantidade).toFixed(2)}</td>
              <td className="px-2 py-1">
                <button
                  onClick={() => removerItem(index)}
                  className="text-red-600 font-bold hover:scale-110 transition"
                >
                  ✖
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Resumo da venda */}
      <div className="mt-6 flex flex-wrap gap-4 items-end">
        <div className="flex flex-col">
          <label className="block text-sm font-medium text-gray-700">Forma de pagamento</label>
          <select
            className="border rounded-md p-2 w-36"
            value={pagamento}
            onChange={(e) => setPagamento(e.target.value)}
          >
            <option value="pix">Pix</option>
            <option value="dinheiro">Dinheiro</option>
            <option value="cartao">Cartão</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="block text-sm font-medium text-gray-700">Desconto</label>
          <input
            type="number"
            className="border rounded-md p-2 w-24"
            value={desconto}
            onChange={(e) => setDesconto(Number(e.target.value))}
          />
        </div>

        <div className="flex flex-col flex-1">
          <label className="block text-sm font-medium text-gray-700">Observação</label>
          <input
            type="text"
            className="border rounded-md p-2 w-full"
            value={observacao}
            onChange={(e) => setObservacao(e.target.value)}
            placeholder="alguma observação"
          />
        </div>

        <div className="ml-auto text-right">
          <p className="text-sm text-gray-600">Valor Total: R$ {total.toFixed(2)}</p>
          <p className="text-sm font-bold text-purple-800">
            Valor Final: R$ {totalComDesconto.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Botão de finalizar */}
      <button className="mt-6 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition">
        Finalizar Venda
      </button>
    </div>
  );
}

export default SaleForm;

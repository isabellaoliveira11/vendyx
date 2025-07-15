import { useEffect, useState } from 'react'
import axios from 'axios'

interface Produto {
  id: string
  name: string
  price: number
}

interface CarrinhoItem {
  produto: Produto
  quantidade: number
}

interface SaleFormProps {
  onVendaCriada: () => void
}

function SaleForm({ onVendaCriada }: SaleFormProps) {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [produtoSelecionado, setProdutoSelecionado] = useState<string>('')
  const [quantidade, setQuantidade] = useState<number>(1)
  const [carrinho, setCarrinho] = useState<CarrinhoItem[]>([])
  const [pagamento, setPagamento] = useState<string>('pix')
  const [observacao, setObservacao] = useState('')
  const [desconto, setDesconto] = useState<number>(0)
  const [cliente, setCliente] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3333/products')
      .then(res => setProdutos(res.data))
      .catch(err => console.error('Erro ao buscar produtos', err))
  }, [])

  const adicionarAoCarrinho = () => {
    const produto = produtos.find(p => p.id === produtoSelecionado)
    if (!produto || quantidade <= 0) return
    setCarrinho(prev => [...prev, { produto, quantidade }])
    setQuantidade(1)
  }

  const removerItem = (index: number) => {
    const novoCarrinho = [...carrinho]
    novoCarrinho.splice(index, 1)
    setCarrinho(novoCarrinho)
  }

  const finalizarVenda = async () => {
    if (!cliente || carrinho.length === 0) {
      alert('Preencha o nome do cliente e adicione pelo menos um item.')
      return
    }

    const payload = {
      clientName: cliente,
      items: carrinho.map(item => ({
        productId: item.produto.id,
        quantity: item.quantidade,
        price: item.produto.price
      }))
    }

    try {
      await axios.post('http://localhost:3333/sales', payload)
      alert('Venda finalizada com sucesso!')
      onVendaCriada() // Atualiza a lista no componente pai
      setCliente('')
      setCarrinho([])
      setObservacao('')
      setPagamento('pix')
      setDesconto(0)
    } catch (error) {
      console.error('Erro ao finalizar venda', error)
      alert('Erro ao finalizar venda.')
    }
  }

  const total = carrinho.reduce((acc, item) => acc + item.produto.price * item.quantidade, 0)
  const totalComDesconto = total - desconto

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full border border-purple-200">
      <h3 className="text-xl font-semibold text-purple-700 mb-4 text-center">
        Criar Nova Venda
      </h3>

      {/* Cliente */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Cliente</label>
        <input
          type="text"
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
          className="border rounded-md p-2 w-full"
          placeholder="Nome do cliente"
        />
      </div>

      {/* Adicionar produto */}
      <div className="flex gap-4 items-end mb-6 flex-wrap">
        <div>
          <label className="block text-sm font-medium text-gray-700">Produto</label>
          <select
            className="border rounded-md p-2 w-40"
            value={produtoSelecionado}
            onChange={(e) => setProdutoSelecionado(e.target.value)}
          >
            <option value="">Selecione</option>
            {produtos.map(produto => (
              <option key={produto.id} value={produto.id}>
                {produto.name}
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
              <td className="px-2 py-1">{item.produto.name}</td>
              <td className="px-2 py-1">{item.quantidade}</td>
              <td className="px-2 py-1">R$ {item.produto.price.toFixed(2)}</td>
              <td className="px-2 py-1">R$ {(item.produto.price * item.quantidade).toFixed(2)}</td>
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
      <button
        onClick={finalizarVenda}
        className="mt-6 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
      >
        Finalizar Venda
      </button>
    </div>
  )
}

export default SaleForm

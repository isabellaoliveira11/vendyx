import { useEffect, useState, Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { Check, CaretDown, ShoppingCartSimple, Trash } from 'phosphor-react';
import axios from 'axios';

interface Produto {
  id: string;
  name: string;
  price: number;
}

interface CarrinhoItem {
  produto: Produto;
  quantidade: number;
}

interface SaleFormProps {
  onVendaCriada: () => void;
}

const formasPagamento = ["Pix", "Dinheiro", "Cartão"];

export default function SaleForm({ onVendaCriada }: SaleFormProps) {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null);
  const [quantidade, setQuantidade] = useState<number>(1);
  const [carrinho, setCarrinho] = useState<CarrinhoItem[]>([]);
  const [pagamento, setPagamento] = useState<string>(formasPagamento[0]);
  const [observacao, setObservacao] = useState('');
  const [desconto, setDesconto] = useState<number>(0);
  const [cliente, setCliente] = useState('');
  const [clienteErro, setClienteErro] = useState<string | null>(null);

  useEffect(() => {
    axios.get('http://localhost:3333/products')
      .then(res => setProdutos(res.data))
      .catch(err => console.error('Erro ao buscar produtos', err));
  }, []);

  const adicionarAoCarrinho = () => {
    if (!produtoSelecionado || quantidade <= 0) {
      alert('Selecione um produto e uma quantidade válida.');
      return;
    }
    setCarrinho(prev => [...prev, { produto: produtoSelecionado, quantidade }]);
    setQuantidade(1); // Reseta a quantidade para 1 após adicionar
    setProdutoSelecionado(null); // Limpa a seleção do produto
  };

  const removerItem = (index: number) => {
    const novoCarrinho = [...carrinho];
    novoCarrinho.splice(index, 1);
    setCarrinho(novoCarrinho);
  };

  const resetForm = () => {
    setCliente('');
    setCarrinho([]);
    setObservacao('');
    setPagamento(formasPagamento[0]);
    setDesconto(0);
    setProdutoSelecionado(null);
    setQuantidade(1);
    setClienteErro(null);
  };

  const finalizarVenda = async () => {
    let hasError = false;

    if (!cliente.trim()) {
      setClienteErro('O nome do cliente é obrigatório.');
      hasError = true;
    } else {
      setClienteErro(null);
    }

    if (carrinho.length === 0) {
      alert('Adicione pelo menos um item ao carrinho para finalizar a venda.');
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const payload = {
      clientName: cliente,
      items: carrinho.map(item => ({
        productId: item.produto.id,
        quantity: item.quantidade,
        price: item.produto.price
      })),
      paymentMethod: pagamento, // Adicionado ao payload
      discount: desconto, // Adicionado ao payload
      observation: observacao // Adicionado ao payload
    };

    try {
      await axios.post('http://localhost:3333/sales', payload);
      alert('Venda finalizada com sucesso!');
      onVendaCriada(); // Notifica o componente pai
      resetForm(); // Reseta o formulário
    } catch (error) {
      console.error('Erro ao finalizar venda', error);
      alert('Erro ao finalizar venda. Verifique o console para mais detalhes.');
    }
  };

  const total = carrinho.reduce((acc, item) => acc + item.produto.price * item.quantidade, 0);
  const totalComDesconto = total - desconto;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full border border-purple-200">
      <h3 className="text-xl font-semibold text-purple-700 mb-4 flex items-center gap-2">
        <ShoppingCartSimple size={24} weight="bold" /> Criar Nova Venda
      </h3>

      {/* Cliente */}
      <div className="mb-4">
        <label htmlFor="cliente-nome" className="block text-sm font-medium text-gray-700 mb-1">
          Nome do Cliente <span className="text-red-500">*</span>
        </label>
        <input
          id="cliente-nome"
          type="text"
          value={cliente}
          onChange={(e) => {
            setCliente(e.target.value);
            if (e.target.value.trim()) setClienteErro(null); // Limpa o erro ao digitar
          }}
          className={`border rounded-md p-2 w-full transition-colors ${clienteErro ? 'border-red-500 ring-red-200 ring-2' : 'border-gray-300 focus:border-purple-500 focus:ring-purple-200 focus:ring-2'}`}
          placeholder="Nome do cliente"
        />
        {clienteErro && <p className="text-red-500 text-sm mt-1">{clienteErro}</p>}
      </div>

      <hr className="my-6 border-purple-100" />

      {/* Produto + Quantidade + Adicionar */}
      <div className="flex flex-col md:flex-row gap-4 items-end mb-6">
        {/* Produto */}
        <div className="flex-1 w-full md:w-auto">
          <label className="block text-sm font-medium text-gray-700 mb-1">Produto</label>
          <Listbox value={produtoSelecionado} onChange={setProdutoSelecionado}>
            <div className="relative">
              <Listbox.Button className="relative w-full md:w-48 cursor-pointer rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 sm:text-sm">
                <span className="block truncate">
                  {produtoSelecionado ? produtoSelecionado.name : 'Selecione um produto'}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <CaretDown size={16} className="text-gray-400" aria-hidden="true" />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full md:w-48 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {produtos.map((produto) => (
                    <Listbox.Option
                      key={produto.id}
                      className={({ active }) =>
                        `relative cursor-pointer select-none py-2 pl-3 pr-9 ${active ? 'bg-purple-100 text-purple-900' : 'text-gray-900'}`
                      }
                      value={produto}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}
                          >
                            {produto.name} (R$ {produto.price.toFixed(2)})
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-purple-600">
                              <Check size={16} aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>

        {/* Quantidade */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Quantidade</label>
          <input
            type="number"
            className="border border-gray-300 rounded-md p-2 w-20 text-center focus:border-purple-500 focus:ring-purple-200 focus:ring-2 transition-colors"
            value={quantidade}
            min={1}
            onChange={(e) => setQuantidade(Number(e.target.value))}
          />
        </div>

        <button
          onClick={adicionarAoCarrinho}
          className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition duration-200 ease-in-out self-stretch flex items-center justify-center gap-1"
        >
          + Adicionar Item
        </button>
      </div>

      {/* Carrinho */}
      {carrinho.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-separate border-spacing-y-2">
            <thead>
              <tr className="text-left text-purple-700">
                <th className="bg-purple-100 px-3 py-2 rounded-l-lg">Produto</th>
                <th className="bg-purple-100 px-3 py-2">Qtd.</th>
                <th className="bg-purple-100 px-3 py-2">Unitário</th>
                <th className="bg-purple-100 px-3 py-2">Total</th>
                <th className="bg-purple-100 px-3 py-2 rounded-r-lg">Ações</th>
              </tr>
            </thead>
            <tbody>
              {carrinho.map((item, index) => (
                <tr key={index} className="bg-purple-50 hover:bg-purple-100 transition duration-150 ease-in-out">
                  <td className="px-3 py-2 rounded-l-lg">{item.produto.name}</td>
                  <td className="px-3 py-2">{item.quantidade}</td>
                  <td className="px-3 py-2">R$ {item.produto.price.toFixed(2)}</td>
                  <td className="px-3 py-2">R$ {(item.produto.price * item.quantidade).toFixed(2)}</td>
                  <td className="px-3 py-2 rounded-r-lg">
                    <button
                      onClick={() => removerItem(index)}
                      className="text-red-600 hover:text-red-800 transition duration-150 ease-in-out"
                      title="Remover item"
                    >
                      <Trash size={18} weight="bold" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center text-gray-500 py-8 border border-dashed border-gray-300 rounded-lg">
          <p className="flex items-center justify-center gap-2">
            <ShoppingCartSimple size={24} className="text-gray-400" />
            Nenhum item no carrinho ainda. Adicione um produto para começar!
          </p>
        </div>
      )}

      <hr className="my-6 border-purple-100" />

      {/* Resumo e Observações */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-end">
        {/* Pagamento */}
        <div className="flex flex-col">
          <label className="block text-sm font-medium text-gray-700 mb-1">Forma de pagamento</label>
          <Listbox value={pagamento} onChange={setPagamento}>
            <div className="relative w-36">
              <Listbox.Button className="relative w-full cursor-pointer rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 sm:text-sm">
                <span className="block truncate">{pagamento}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <CaretDown size={16} className="text-gray-400" aria-hidden="true" />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {formasPagamento.map((f) => (
                    <Listbox.Option
                      key={f}
                      className={({ active }) =>
                        `relative cursor-pointer select-none py-2 pl-3 pr-9 ${active ? 'bg-purple-100 text-purple-900' : 'text-gray-900'}`
                      }
                      value={f}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}
                          >
                            {f}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-purple-600">
                              <Check size={16} aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>

        {/* Desconto */}
        <div className="flex flex-col">
          <label className="block text-sm font-medium text-gray-700 mb-1">Desconto (R$)</label>
          <input
            type="number"
            className="border border-gray-300 rounded-md p-2 w-24 text-center focus:border-purple-500 focus:ring-purple-200 focus:ring-2 transition-colors"
            value={desconto}
            onChange={(e) => setDesconto(Number(e.target.value))}
            min={0}
          />
        </div>

        {/* Observação */}
        <div className="flex flex-col flex-1 w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">Observação</label>
          <input
            type="text"
            className="border border-gray-300 rounded-md p-2 w-full focus:border-purple-500 focus:ring-purple-200 focus:ring-2 transition-colors"
            value={observacao}
            onChange={(e) => setObservacao(e.target.value)}
            placeholder="Alguma observação sobre a venda..."
          />
        </div>

        {/* Total */}
        <div className="ml-auto text-right mt-4 md:mt-0">
          <p className="text-sm text-gray-600">Subtotal: <span className="font-medium">R$ {total.toFixed(2)}</span></p>
          <p className="text-lg font-bold text-purple-800">Valor Final: <span className="text-green-600">R$ {totalComDesconto.toFixed(2)}</span></p>
        </div>
      </div>

      {/* Botão Finalizar */}
      <button
        onClick={finalizarVenda}
        className="mt-6 w-full bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition duration-200 ease-in-out flex items-center justify-center gap-2 text-lg font-semibold"
      >
        <Check size={24} weight="bold" /> Finalizar Venda
      </button>
    </div>
  );
}
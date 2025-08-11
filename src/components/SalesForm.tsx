import { useEffect, useState, Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { Check, CaretDown, ShoppingCartSimple, Trash, Percent } from 'phosphor-react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface Produto {
  id: string;
  name: string;
  price: number;
  stock: number;
}

interface CarrinhoItem {
  produto: Produto;
  quantidade: number;
}

interface Client {
  id: string;
  name: string;
}

interface SaleFormProps {
  onVendaCriada: () => void;
  clientes: Client[];
}

const formasPagamento = ["Pix", "Dinheiro", "Cartão"];

export default function SaleForm({ onVendaCriada, clientes }: SaleFormProps) {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null);
  const [quantidade, setQuantidade] = useState<number>(1);
  const [carrinho, setCarrinho] = useState<CarrinhoItem[]>([]);
  const [pagamento, setPagamento] = useState<string>(formasPagamento[0]);
  const [observacao, setObservacao] = useState('');
  const [descontoPercentual, setDescontoPercentual] = useState<number>(0);
  const [clienteSelecionado, setClienteSelecionado] = useState<Client | null>(null);
  const [clienteErro, setClienteErro] = useState<string | null>(null);

  useEffect(() => {
    axios.get('http://localhost:3333/products')
      .then(res => setProdutos(res.data))
      .catch(err => {
        console.error('Erro ao buscar produtos', err);
        toast.error('Erro ao carregar lista de produtos.');
      });
  }, []);

  const adicionarAoCarrinho = () => {
    if (!produtoSelecionado || quantidade <= 0) {
      toast.error('Selecione um produto e uma quantidade válida.');
      return;
    }

    const itemExistente = carrinho.find(item => item.produto.id === produtoSelecionado.id);
    const quantidadeNoCarrinho = itemExistente ? itemExistente.quantidade : 0;
    const quantidadeTotalDesejada = quantidadeNoCarrinho + quantidade;

    if (produtoSelecionado.stock < quantidadeTotalDesejada) {
      toast.error(`Estoque insuficiente para "${produtoSelecionado.name}". Disponível: ${produtoSelecionado.stock}. Você já tem ${quantidadeNoCarrinho} no carrinho.`);
      return;
    }

    if (itemExistente) {
      setCarrinho(prev => prev.map(item =>
        item.produto.id === produtoSelecionado.id
          ? { ...item, quantidade: quantidadeTotalDesejada }
          : item
      ));
    } else {
      setCarrinho(prev => [...prev, { produto: produtoSelecionado, quantidade }]);
    }

    setQuantidade(1);
    setProdutoSelecionado(null);
    toast.success('Item adicionado ao carrinho!');
  };

  const removerItem = (index: number) => {
    const novoCarrinho = [...carrinho];
    novoCarrinho.splice(index, 1);
    setCarrinho(novoCarrinho);
    toast('Item removido do carrinho.', { icon: '👋' });
  };

  const resetForm = () => {
    setClienteSelecionado(null);
    setCarrinho([]);
    setObservacao('');
    setPagamento(formasPagamento[0]);
    setDescontoPercentual(0);
    setProdutoSelecionado(null);
    setQuantidade(1);
    setClienteErro(null);
  };

  const finalizarVenda = async () => {
    let hasError = false;

    if (!clienteSelecionado) {
      setClienteErro('O cliente é obrigatório.');
      hasError = true;
    } else {
      setClienteErro(null);
    }

    if (carrinho.length === 0) {
      toast.error('Adicione pelo menos um item ao carrinho para finalizar a venda.');
      hasError = true;
    }

    if (hasError) return;

    const total = carrinho.reduce((acc, item) => acc + item.produto.price * item.quantidade, 0);
    const valorDescontoCalculado = total * (descontoPercentual / 100);
    const descontoFinalParaBackend = Math.min(Math.max(0, valorDescontoCalculado), total);

    const payload = {
      // ✅ AQUI ESTÁ A CORREÇÃO!
      // Enviamos o ID do cliente, e não mais o nome.
      clientId: clienteSelecionado!.id,
      items: carrinho.map(item => ({
        productId: item.produto.id,
        quantity: item.quantidade,
        price: item.produto.price
      })),
      paymentMethod: pagamento,
      discount: descontoFinalParaBackend,
      observation: observacao
    };

    try {
      await toast.promise(
        axios.post('http://localhost:3333/sales', payload),
        {
          loading: 'Finalizando venda...',
          success: 'Venda finalizada com sucesso!',
          error: (err) => {
            const backendErrorMsg = err.response?.data?.error || JSON.stringify(err.response?.data) || 'Erro desconhecido ao finalizar venda.';
            console.error('Erro ao finalizar venda:', err);
            return backendErrorMsg;
          },
        }
      );
      onVendaCriada();
      resetForm();
    } catch (error) {
      console.error('Erro capturado após o toast.promise:', error);
    }
  };

  const total = carrinho.reduce((acc, item) => acc + item.produto.price * item.quantidade, 0);
  const valorDescontoAplicadoDisplay = total * (descontoPercentual / 100);
  const totalComDesconto = total - valorDescontoAplicadoDisplay;
  const finalPriceDisplayed = Math.max(0, totalComDesconto);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full border border-purple-200">
      <h3 className="text-xl font-semibold text-purple-700 mb-4 flex items-center gap-2">
        <ShoppingCartSimple size={24} weight="bold" /> Criar Nova Venda
      </h3>

      {/* Cliente */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Cliente <span className="text-red-500">*</span>
        </label>
        <Listbox value={clienteSelecionado} onChange={setClienteSelecionado}>
          <div className="relative">
            <Listbox.Button className="relative w-full cursor-pointer rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 sm:text-sm">
              <span className="block truncate">
                {clienteSelecionado ? clienteSelecionado.name : 'Selecione um cliente'}
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
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {clientes.map((cliente) => (
                  <Listbox.Option
                    key={cliente.id}
                    className={({ active }) =>
                      `relative cursor-pointer select-none py-2 pl-3 pr-9 ${active ? 'bg-purple-100 text-purple-900' : 'text-gray-900'}`
                    }
                    value={cliente}
                  >
                    {({ selected }) => (
                      <>
                        <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>
                          {cliente.name}
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
        {clienteErro && <p className="text-red-500 text-sm mt-1">{clienteErro}</p>}
      </div>

      {/* O resto do seu formulário continua aqui... */}
      {/* Produto + Quantidade + Adicionar */}
      <div className="flex flex-col md:flex-row gap-4 items-end mb-6">
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
                          <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>
                            {produto.name} (R$ {produto.price.toFixed(2)}) - Estoque: {produto.stock}
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
          className="bg-purple-600 text-white px-3 py-2 rounded-md hover:bg-purple-700 transition duration-200 ease-in-out self-end flex items-center justify-center gap-1 text-sm font-semibold h-[42px] min-w-[100px]"
        >
          + Adicionar
        </button>
      </div>

      {/* Carrinho */}
      {carrinho.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-separate border-spacing-y-2">
            <thead>
              <tr className="text-left bg-purple-100 text-purple-700 uppercase font-semibold text-xs rounded-lg">
                <th className="py-3 px-3 rounded-l-lg">Produto</th>
                <th className="py-3 px-3">Qtd.</th>
                <th className="py-3 px-3">Unitário</th>
                <th className="py-3 px-3">Total</th>
                <th className="py-3 px-3 rounded-r-lg">Ações</th>
              </tr>
            </thead>
            <tbody>
              {carrinho.map((item, index) => (
                <tr key={index} className="bg-white hover:bg-gray-50 transition duration-150 ease-in-out shadow-sm rounded-lg">
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
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-end flex-wrap">
        <div className="flex flex-col flex-shrink-0 w-48">
          <label className="block text-sm font-medium text-gray-700 mb-1">Forma de pagamento</label>
          <Listbox value={pagamento} onChange={setPagamento}>
            <div className="relative w-full">
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
                          <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>
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

        <div className="flex flex-col flex-shrink-0 w-32">
          <label className="block text-sm font-medium text-gray-700 mb-1">Desconto (%)</label>
          <div className="relative">
            <input
              type="number"
              className="border border-gray-300 rounded-md p-2 w-full text-center focus:border-purple-500 focus:ring-purple-200 focus:ring-2 transition-colors"
              value={descontoPercentual}
              onChange={(e) => setDescontoPercentual(Number(e.target.value))}
              min={0}
              max={100}
              step={0.1}
            />
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
              <Percent size={18} />
            </span>
          </div>
        </div>

        <div className="ml-auto text-right flex-shrink-0 mt-4 md:mt-0">
          <p className="text-sm text-gray-600">Subtotal: <span className="font-medium">R$ {total.toFixed(2)}</span></p>
          <p className="text-lg font-bold text-purple-800">Valor Final: <span className="text-green-600">R$ {finalPriceDisplayed.toFixed(2)}</span></p>
        </div>
      </div>

      <button
        onClick={finalizarVenda}
        className="mt-6 w-full bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition duration-200 ease-in-out flex items-center justify-center gap-2 text-lg font-semibold"
      >
        <Check size={24} weight="bold" /> Finalizar Venda
      </button>
    </div>
  );
}

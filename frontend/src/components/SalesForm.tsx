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

const formasPagamento = ['Pix', 'Dinheiro', 'Cartão'];

export default function SaleForm({ onVendaCriada, clientes }: SaleFormProps) {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null);
  const [quantidade, setQuantidade] = useState<number>(1);
  const [carrinho, setCarrinho] = useState<CarrinhoItem[]>([]);
  const [pagamento, setPagamento] = useState<string>(formasPagamento[0]);
  const [descontoPercentual, setDescontoPercentual] = useState<number>(0);
  const [clienteSelecionado, setClienteSelecionado] = useState<Client | null>(null);
  const [clienteErro, setClienteErro] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:3333/products')
      .then((res) => setProdutos(res.data))
      .catch((err) => {
        console.error('Erro ao buscar produtos', err);
        toast.error('Erro ao carregar lista de produtos.');
      });
  }, []);

  const adicionarAoCarrinho = () => {
    if (!produtoSelecionado || quantidade <= 0) {
      toast.error('Selecione um produto e uma quantidade válida.');
      return;
    }

    const existente = carrinho.find((i) => i.produto.id === produtoSelecionado.id);
    const qtdNoCarrinho = existente ? existente.quantidade : 0;
    const qtdTotal = qtdNoCarrinho + quantidade;

    if (produtoSelecionado.stock < qtdTotal) {
      toast.error(
        `Estoque insuficiente para "${produtoSelecionado.name}". Disponível: ${produtoSelecionado.stock}.`
      );
      return;
    }

    if (existente) {
      setCarrinho((prev) =>
        prev.map((i) =>
          i.produto.id === produtoSelecionado.id ? { ...i, quantidade: qtdTotal } : i
        )
      );
    } else {
      setCarrinho((prev) => [...prev, { produto: produtoSelecionado, quantidade }]);
    }

    setQuantidade(1);
    setProdutoSelecionado(null);
    toast.success('Item adicionado ao carrinho!');
  };

  const removerItem = (index: number) => {
    setCarrinho((prev) => prev.filter((_, i) => i !== index));
    toast('Item removido do carrinho.', { icon: '�️' });
  };

  const resetForm = () => {
    setClienteSelecionado(null);
    setCarrinho([]);
    setPagamento(formasPagamento[0]);
    setDescontoPercentual(0);
    setProdutoSelecionado(null);
    setQuantidade(1);
    setClienteErro(null);
  };

  const finalizarVenda = async () => {
    let erro = false;

    if (!clienteSelecionado) {
      setClienteErro('O cliente é obrigatório.');
      erro = true;
    } else {
      setClienteErro(null);
    }

    if (carrinho.length === 0) {
      toast.error('Adicione pelo menos um item ao carrinho para finalizar a venda.');
      erro = true;
    }

    if (erro) return;

    setSubmitting(true);

    const subtotal = carrinho.reduce(
      (acc, i) => acc + i.produto.price * i.quantidade,
      0
    );
    const valorDesc = subtotal * (descontoPercentual / 100);
    const descontoFinal = Math.min(Math.max(0, valorDesc), subtotal);

    const payload = {
      clientId: clienteSelecionado!.id,
      items: carrinho.map((i) => ({
        productId: i.produto.id,
        quantity: i.quantidade,
        price: i.produto.price,
      })),
      paymentMethod: pagamento,
      discount: descontoFinal,
    };

    try {
      await toast.promise(axios.post('http://localhost:3333/sales', payload), {
        loading: 'Finalizando venda...',
        success: 'Venda finalizada com sucesso!',
        error: 'Erro ao finalizar venda.',
      });
      onVendaCriada();
      resetForm();
    } finally {
      setSubmitting(false);
    }
  };

  const subtotal = carrinho.reduce(
    (acc, i) => acc + i.produto.price * i.quantidade,
    0
  );
  const descontoAplicado = subtotal * (descontoPercentual / 100);
  const totalFinal = Math.max(0, subtotal - descontoAplicado);

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md w-full border border-purple-200">
      <h3 className="text-lg sm:text-xl font-semibold text-purple-700 mb-4 flex items-center gap-2">
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
                <CaretDown size={16} className="text-gray-400" />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {clientes.map((c) => (
                  <Listbox.Option
                    key={c.id}
                    value={c}
                    className={({ active }) =>
                      `relative cursor-pointer select-none py-2 pl-3 pr-9 ${
                        active ? 'bg-purple-100 text-purple-900' : 'text-gray-900'
                      }`
                    }
                  >
                    {({ selected }) => (
                      <>
                        <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>
                          {c.name}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-purple-600">
                            <Check size={16} />
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

      {/* Produto + Quantidade + Adicionar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 w-full md:w-auto">
          <label className="block text-sm font-medium text-gray-700 mb-1">Produto</label>
          <Listbox value={produtoSelecionado} onChange={setProdutoSelecionado}>
            <div className="relative">
              <Listbox.Button className="relative w-full md:w-56 cursor-pointer rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 sm:text-sm">
                <span className="block truncate">
                  {produtoSelecionado ? produtoSelecionado.name : 'Selecione um produto'}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <CaretDown size={16} className="text-gray-400" />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full md:w-56 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {produtos.map((p) => (
                    <Listbox.Option
                      key={p.id}
                      value={p}
                      className={({ active }) =>
                        `relative cursor-pointer select-none py-2 pl-3 pr-9 ${
                          active ? 'bg-purple-100 text-purple-900' : 'text-gray-900'
                        }`
                      }
                    >
                      {({ selected }) => (
                        <>
                          <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>
                            {p.name} (R$ {p.price.toFixed(2)}) — Estoque: {p.stock}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-purple-600">
                              <Check size={16} />
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
            min={1}
            value={quantidade}
            onChange={(e) => setQuantidade(Number(e.target.value))}
            className="border border-gray-300 rounded-md p-2 w-20 text-center focus:border-purple-500 focus:ring-purple-200 focus:ring-2 transition-colors"
          />
        </div>

        <button
          onClick={adicionarAoCarrinho}
          className="bg-purple-600 text-white px-3 py-2 rounded-md hover:bg-purple-700 transition duration-200 ease-in-out flex items-center justify-center gap-1 text-sm font-semibold h-[42px] min-w-[110px]"
        >
          + Adicionar
        </button>
      </div>

      {/* Carrinho (Layout para Mobile e Desktop) */}
      {carrinho.length > 0 ? (
        <>
          {/* Tabela para Desktop */}
          <div className="hidden lg:block overflow-x-auto">
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
                  <tr
                    key={index}
                    className="bg-white hover:bg-gray-50 transition duration-150 ease-in-out shadow-sm rounded-lg"
                  >
                    <td className="px-3 py-2 rounded-l-lg">{item.produto.name}</td>
                    <td className="px-3 py-2">{item.quantidade}</td>
                    <td className="px-3 py-2">R$ {item.produto.price.toFixed(2)}</td>
                    <td className="px-3 py-2">
                      R$ {(item.produto.price * item.quantidade).toFixed(2)}
                    </td>
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

          {/* Versão de Lista (Cards) para Mobile */}
          <div className="lg:hidden space-y-4">
            {carrinho.map((item, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-lg text-gray-800">
                    {item.produto.name}
                  </span>
                  <button
                    onClick={() => removerItem(index)}
                    className="text-red-600 hover:text-red-800 transition duration-150 ease-in-out"
                    title="Remover item"
                  >
                    <Trash size={20} weight="bold" />
                  </button>
                </div>
                <div className="flex flex-col text-sm text-gray-600">
                  <span className="font-medium">Quantidade: {item.quantidade}</span>
                  <span className="font-medium">Preço Unitário: R$ {item.produto.price.toFixed(2)}</span>
                  <span className="font-semibold text-base text-purple-700 mt-1">
                    Total: R$ {(item.produto.price * item.quantidade).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center text-gray-500 py-8 border border-dashed border-gray-300 rounded-lg">
          <p className="flex items-center justify-center gap-2">
            <ShoppingCartSimple size={24} className="text-gray-400" />
            Nenhum item no carrinho ainda. Adicione um produto para começar!
          </p>
        </div>
      )}

      <hr className="my-6 border-purple-100" />

      {/* Pagamento / Desconto / Total */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
        {/* Pagamento */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Forma de pagamento
          </label>
          <Listbox value={pagamento} onChange={setPagamento}>
            <div className="relative w-full">
              <Listbox.Button className="relative w-full cursor-pointer rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 sm:text-sm">
                <span className="block truncate">{pagamento}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <CaretDown size={16} className="text-gray-400" />
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
                      value={f}
                      className={({ active }) =>
                        `relative cursor-pointer select-none py-2 pl-3 pr-9 ${
                          active ? 'bg-purple-100 text-purple-900' : 'text-gray-900'
                        }`
                      }
                    >
                      {({ selected }) => (
                        <>
                          <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>
                            {f}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-purple-600">
                              <Check size={16} />
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
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Desconto (%)</label>
          <div className="relative">
            <input
              type="number"
              min={0}
              max={100}
              step={0.1}
              value={descontoPercentual}
              onChange={(e) => setDescontoPercentual(Number(e.target.value))}
              className="border border-gray-300 rounded-md p-2 w-full text-center focus:border-purple-500 focus:ring-purple-200 focus:ring-2 transition-colors"
            />
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
              <Percent size={18} />
            </span>
          </div>
        </div>

        {/* Totais */}
        <div className="text-right">
          <p className="text-sm text-gray-600">
            Subtotal: <span className="font-medium">R$ {subtotal.toFixed(2)}</span>
          </p>
          <p className="text-lg font-bold text-purple-800">
            Valor Final:{' '}
            <span className="text-green-600">R$ {totalFinal.toFixed(2)}</span>
          </p>
        </div>
      </div>

      <button
        onClick={finalizarVenda}
        disabled={submitting}
        className="mt-6 w-full bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition duration-200 ease-in-out flex items-center justify-center gap-2 text-base sm:text-lg font-semibold disabled:opacity-60"
      >
        <Check size={22} weight="bold" /> {submitting ? 'Finalizando…' : 'Finalizar Venda'}
      </button>
    </div>
  );
}

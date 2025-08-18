import { useEffect, useState } from 'react';
import axios from 'axios';
import { format, isSameMonth, isValid } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  Eye,
  CurrencyDollar,
  Package,
  PlusCircle,
  HandWaving,
  TrendUp
} from 'phosphor-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Calendar } from '../components/Calendar';
import { API_URL } from '../config/api';

const PaymentMethodTag = ({ method }: { method: string }) => {
  const styles = {
    Pix: 'bg-green-100 text-green-800',
    Dinheiro: 'bg-sky-100 text-sky-800',
    Cartão: 'bg-orange-100 text-orange-800',
    'Cartão de Crédito': 'bg-orange-100 text-orange-800',
    'Cartão de Débito': 'bg-yellow-100 text-yellow-800',
  } as const;

  const cls = styles[method as keyof typeof styles] || 'bg-gray-100 text-gray-800';

  return (
    <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full ${cls}`}>
      {method || 'Não informado'}
    </span>
  );
};

type Sale = {
  id: string;
  clientName: string;
  total: number;
  createdAt: string;
  paymentMethod: string;
};

type Product = { id: string };

export default function Home() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loadingSales, setLoadingSales] = useState(true);
  const [currentDateString, setCurrentDateString] = useState('');
  const [totalMonthSalesValue, setTotalMonthSalesValue] = useState(0);
  const [todaySalesValue, setTodaySalesValue] = useState(0);
  const [totalProductsCount, setTotalProductsCount] = useState(0);

  const navigate = useNavigate();
  const isGuestMode = localStorage.getItem('guestMode') === 'true';

  const formatCurrency = (v: number) =>
    v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  useEffect(() => {
    const today = new Date();
    const formattedDate = format(today, "EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR });
    setCurrentDateString(formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1));
    fetchSalesAndProducts();
  }, []);

  const fetchSalesAndProducts = async () => {
    setLoadingSales(true);
    try {
      const [salesRes, productsRes] = await Promise.all([
        axios.get<Sale>(`${API_URL}/sales` as any) as any,
        axios.get<Product[]>(`${API_URL}/products`),
      ]);

      const allSales = (salesRes as any).data as Sale[];
      const validSales = allSales.filter(s => isValid(new Date(s.createdAt)));

      const today = new Date();
      const key = format(today, 'yyyy-MM-dd');

      const salesToday = validSales.filter(
        s => format(new Date(s.createdAt), 'yyyy-MM-dd') === key
      );
      setTodaySalesValue(salesToday.reduce((acc, s) => acc + s.total, 0));

      const monthSales = validSales.filter(s => isSameMonth(new Date(s.createdAt), today));
      setTotalMonthSalesValue(monthSales.reduce((acc, s) => acc + s.total, 0));

      setSales(
        validSales
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 5)
      );

      setTotalProductsCount(productsRes.data.length);
    } catch (err) {
      console.error(err);
      toast.error('Erro ao carregar dados da Home.');
    } finally {
      setLoadingSales(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Cabeçalho compacto */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Início</h2>
          <p className="text-sm text-gray-500 mt-0.5">{currentDateString}</p>
        </div>

        {/* Botão com efeito vidro (glassmorphism) */}
        <button
          onClick={() => navigate('/vendas')}
          className="bg-white/30 backdrop-blur-md border border-gray-200/60 hover:bg-white/50 text-gray-800 px-4 py-2 rounded-lg font-medium transition shadow-sm text-sm flex items-center gap-2"
        >
          <PlusCircle size={18} weight="bold" /> Nova Venda
        </button>
      </div>

      {/* Grid principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna esquerda */}
        <div className="space-y-5 lg:col-span-2">
          {/* Banner MENOR, clean e com vidro */}
          <div className="relative">
            <div className="relative bg-white/40 backdrop-blur-md border border-gray-200/70 text-gray-900 px-4 py-3 rounded-2xl shadow-md inline-flex items-center gap-3 max-w-[520px] w-full">
              <HandWaving size={26} weight="duotone" className="text-gray-500 flex-shrink-0" />
              <div className="leading-tight">
                <h3 className="text-sm font-semibold">
                  Seja Bem-vindo, <span>{isGuestMode ? 'Convidado' : 'Usuário'}</span>
                </h3>
                <p className="text-xs opacity-80">Tenha um ótimo dia, e boas vendas!</p>
              </div>
            </div>
          </div>

          {/* Tabela compacta */}
          <div className="bg-white p-5 rounded-2xl shadow-lg border border-gray-100">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Últimas Vendas</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 text-left">
                    <th className="py-2.5 px-2 text-xs text-gray-500 uppercase font-semibold">Cod. Venda</th>
                    <th className="py-2.5 px-2 text-xs text-gray-500 uppercase font-semibold">Cliente</th>
                    <th className="py-2.5 px-2 text-xs text-gray-500 uppercase font-semibold">Data</th>
                    <th className="py-2.5 px-2 text-xs text-gray-500 uppercase font-semibold">Pagamento</th>
                    <th className="py-2.5 px-2 text-xs text-gray-500 uppercase font-semibold text-center">Valor</th>
                    <th className="py-2.5 px-2 text-xs text-gray-500 uppercase font-semibold text-center">Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {loadingSales ? (
                    <tr>
                      <td colSpan={6} className="py-6 text-center text-gray-500">Carregando...</td>
                    </tr>
                  ) : sales.length ? (
                    sales.map((venda) => (
                      <tr key={venda.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-2 text-gray-700">{venda.id.slice(0, 8)}</td>
                        <td className="py-3 px-2 text-gray-700">{venda.clientName}</td>
                        <td className="py-3 px-2 text-gray-600">
                          {format(new Date(venda.createdAt), 'dd/MM/yy HH:mm')}
                        </td>
                        <td className="py-3 px-2">
                          <PaymentMethodTag method={venda.paymentMethod} />
                        </td>
                        {/* números não-bold e em cinza */}
                        <td className="py-3 px-2 text-gray-800 text-center">
                          {formatCurrency(venda.total)}
                        </td>
                        <td className="py-3 px-2 text-center">
                          <button
                            className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-purple-600"
                          >
                            <Eye size={16} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-6 text-center text-gray-500">
                        Nenhuma venda recente encontrada.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Coluna direita compacta */}
        <div className="space-y-5">
          <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-0.5">Total Vendido Hoje</p>
              <p className="text-2xl font-medium text-gray-800">{formatCurrency(todaySalesValue)}</p>
            </div>
            <div className="bg-purple-100 p-2.5 rounded-full">
              <TrendUp size={20} weight="duotone" className="text-purple-600" />
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-0.5">Total Vendido no Mês</p>
              <p className="text-2xl font-medium text-gray-800">{formatCurrency(totalMonthSalesValue)}</p>
            </div>
            <div className="bg-green-100 p-2.5 rounded-full">
              <CurrencyDollar size={20} weight="duotone" className="text-green-600" />
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-0.5">Produtos Cadastrados</p>
              <p className="text-2xl font-medium text-gray-800">{totalProductsCount}</p>
            </div>
            <div className="bg-sky-100 p-2.5 rounded-full">
              <Package size={20} weight="duotone" className="text-sky-600" />
            </div>
          </div>

          <div className="bg-white p-3 rounded-2xl shadow-lg border border-gray-100">
            <Calendar />
          </div>
        </div>
      </div>
    </div>
  );
}

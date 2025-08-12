import { useEffect, useState } from 'react';
import axios from 'axios';
import { format, isSameMonth, isValid } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  Tag,
  CurrencyDollar,
  Package,
  Info,
  PlusCircle,
  HandWaving,
  Receipt
} from 'phosphor-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Calendar } from '../components/Calendar';

interface Sale {
  id: string;
  clientName: string;
  total: number;
  itemsCount: number;
  createdAt: string;
  paymentMethod: string;
  discount: number;
  observation: string;
}

function Home() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loadingSales, setLoadingSales] = useState(true);
  const [currentDateString, setCurrentDateString] = useState('');
  const [totalMonthSalesValue, setTotalMonthSalesValue] = useState(0);
  const [todaySalesValue, setTodaySalesValue] = useState(0);
  const [totalProductsCount, setTotalProductsCount] = useState(0);

  const navigate = useNavigate();
  // Adiciona uma verificação para a flag de convidado no localStorage
  const isGuestMode = localStorage.getItem('guestMode') === 'true';

  const formatCurrency = (value: number) =>
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const fetchSalesAndProducts = async () => {
    // Se estiver no modo convidado, não faz a requisição à API
    if (isGuestMode) {
      setLoadingSales(false);
      return;
    }

    setLoadingSales(true);
    try {
      const [salesRes, productsRes] = await Promise.all([
        axios.get('http://localhost:3333/sales'),
        axios.get('http://localhost:3333/products')
      ]);

      const allSales: Sale[] = salesRes.data;
      const validSales = allSales.filter(sale => isValid(new Date(sale.createdAt)));

      const today = new Date();
      const todayFormatted = format(today, 'yyyy-MM-dd');

      const salesToday = validSales.filter(
        (sale: Sale) => format(new Date(sale.createdAt), 'yyyy-MM-dd') === todayFormatted
      );
      setTodaySalesValue(salesToday.reduce((acc, sale) => acc + sale.total, 0));

      const salesThisMonth = validSales.filter((sale: Sale) =>
        isSameMonth(new Date(sale.createdAt), today)
      );
      setTotalMonthSalesValue(salesThisMonth.reduce((acc, sale) => acc + sale.total, 0));

      setSales(
        validSales
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 5)
      );

      setTotalProductsCount(productsRes.data.length);
    } catch (err) {
      console.error('Erro ao buscar dados:', err);
      toast.error('Erro ao carregar dados da Home.');
    } finally {
      setLoadingSales(false);
    }
  };

  useEffect(() => {
    const today = new Date();
    const formattedDate = format(today, "EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR });
    setCurrentDateString(formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1));
    fetchSalesAndProducts();
  }, []);

  useEffect(() => {
    const handleFocus = () => {
      if (document.visibilityState === 'visible') fetchSalesAndProducts();
    };
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
            <Receipt size={32} className="text-purple-700" weight="duotone" />
            Início
          </h2>
          <p className="text-sm text-gray-500 mt-1">{currentDateString}</p>
        </div>
        <button
          onClick={() => navigate('/vendas')}
          className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-lg font-medium transition duration-300 shadow-md text-sm flex items-center gap-2"
        >
          <PlusCircle size={20} weight="bold" /> Nova Venda
        </button>
      </div>


      {/* Grid principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna esquerda */}
        <div className="space-y-6 lg:col-span-2">
          <div className="bg-purple-600 text-white p-6 rounded-xl shadow-md flex items-center gap-4">
            <HandWaving size={48} weight="duotone" className="text-purple-200" />
            <div>
              <h3 className="text-2xl font-bold mb-1">
                {/* Muda a mensagem de boas-vindas para convidados */}
                Seja Bem-vindo, <span className="uppercase">{isGuestMode ? 'Convidado' : 'Isabela Oliveira'}</span>!
              </h3>
              <p className="text-base opacity-95">Tenha um ótimo dia, e boas vendas!</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h4 className="text-xl font-semibold text-gray-800 mb-5">Últimas Vendas</h4>
            <div className="overflow-x-auto">
              <table className="min-w-[720px] w-full text-sm">
                <thead>
                  <tr className="text-left border-b border-gray-200 text-gray-500 uppercase font-semibold text-xs">
                    <th className="py-3 px-2 whitespace-nowrap">Cod. Venda</th>
                    <th className="py-3 px-2 whitespace-nowrap">Cliente</th>
                    <th className="py-3 px-2 whitespace-nowrap">Data</th>
                    <th className="py-3 px-2 whitespace-nowrap">Forma de Pagamento</th>
                    <th className="py-3 px-2 whitespace-nowrap">Valor da Venda</th>
                    <th className="py-3 px-2 whitespace-nowrap">Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {loadingSales ? (
                    <tr>
                      <td colSpan={6} className="py-6 text-center text-gray-500">
                        {/* Mensagem diferente para convidados */}
                        {isGuestMode ? 'Modo Convidado. Os dados não foram carregados.' : 'Carregando vendas...'}
                      </td>
                    </tr>
                  ) : sales.length > 0 ? (
                    sales.map((venda: Sale) => (
                      <tr key={venda.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                        <td className="py-3 px-2 text-gray-800">{venda.id.slice(0, 8)}</td>
                        <td className="py-3 px-2 text-gray-700">
                          {venda.clientName || 'Cliente Padrão'}
                        </td>
                        <td className="py-3 px-2 text-gray-700 whitespace-nowrap">
                          {isValid(new Date(venda.createdAt))
                            ? format(new Date(venda.createdAt), 'dd/MM/yyyy HH:mm', { locale: ptBR })
                            : 'Data Inválida'}
                        </td>
                        <td className="py-3 px-2 text-gray-700">
                          {venda.paymentMethod || 'Não Informado'}
                        </td>
                        <td className="py-3 px-2 text-green-600 font-semibold">
                          {formatCurrency(venda.total)}
                        </td>
                        <td className="py-3 px-2">
                          <button
                            className="text-lg text-gray-500 hover:text-purple-600 transition-colors"
                            title="Ver Detalhes"
                          >
                            <Info size={20} />
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

        {/* Coluna direita */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
            <div className="bg-white p-5 rounded-xl shadow-md flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Vendido Hoje</p>
                <p className="text-2xl font-extrabold text-purple-700">
                  {formatCurrency(todaySalesValue)}
                </p>
              </div>
              <Tag size={40} weight="duotone" className="text-purple-400 opacity-70" />
            </div>
            <div className="bg-white p-5 rounded-xl shadow-md flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Vendido no Mês</p>
                <p className="text-2xl font-extrabold text-purple-700">
                  {formatCurrency(totalMonthSalesValue)}
                </p>
              </div>
              <CurrencyDollar size={40} weight="duotone" className="text-purple-400 opacity-70" />
            </div>
            <div className="bg-white p-5 rounded-xl shadow-md flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Produtos Cadastrados</p>
                <p className="text-2xl font-extrabold text-purple-700">{totalProductsCount}</p>
              </div>
              <Package size={40} weight="duotone" className="text-purple-400 opacity-70" />
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-md border border-purple-100">
            <Calendar />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

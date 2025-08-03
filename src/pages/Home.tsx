import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import {
  format,
  getDay,
  startOfMonth,
  eachDayOfInterval,
  subMonths,
  addMonths,
  isSameDay,
  isSameMonth,
  isAfter,
  isBefore,
  endOfMonth,
  isValid, // Import isValid from date-fns
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Tag, CurrencyDollar, Package, Info, CaretLeft, CaretRight, PlusCircle } from 'phosphor-react';

interface Sale {
  id: string;
  date: string; // Assumindo que a API retorna como string de data/hora
  total: number;
  paymentMethod: string;
  items: any[]; // Para contagem de itens
  clientName: string; // Adicionado para aprimorar a tabela
}

interface Product {
  id: string;
  name: string;
}

function Home() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loadingSales, setLoadingSales] = useState(true);
  const [currentDateString, setCurrentDateString] = useState('');
  const [totalMonthSalesValue, setTotalMonthSalesValue] = useState(0);
  const [todaySalesValue, setTodaySalesValue] = useState(0);
  const [currentCalendarMonth, setCurrentCalendarMonth] = useState(new Date());
  const [totalProductsCount, setTotalProductsCount] = useState(0);

  const weekDays = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];

  const generateCalendarDays = (date: Date) => {
    const startOfMonthDate = startOfMonth(date);
    let dayOfWeekOfFirstDayOfMonth = getDay(startOfMonthDate);

    let adjustStartDays = dayOfWeekOfFirstDayOfMonth === 0 ? 6 : dayOfWeekOfFirstDayOfMonth - 1;

    const startGridDay = new Date(startOfMonthDate);
    startGridDay.setDate(startOfMonthDate.getDate() - adjustStartDays);

    const endGridDay = new Date(startGridDay);
    endGridDay.setDate(startGridDay.getDate() + 41);

    const allDaysInGrid = eachDayOfInterval({
      start: startGridDay,
      end: endGridDay,
    });

    return allDaysInGrid.map((d) => ({
      date: d,
      dayNumber: format(d, 'd'),
      isToday: isSameDay(d, new Date()),
      isCurrentMonth: isSameMonth(d, date),
      hasSales: false,
      key: format(d, 'yyyy-MM-dd'),
    }));
  };

  const [calendarGridDays, setCalendarGridDays] = useState(generateCalendarDays(currentCalendarMonth));

  const goToPreviousMonth = () => setCurrentCalendarMonth(subMonths(currentCalendarMonth, 1));
  const goToNextMonth = () => setCurrentCalendarMonth(addMonths(currentCalendarMonth, 1));

  useEffect(() => {
    const today = new Date();
    const formattedDate = format(today, "EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR });
    setCurrentDateString(formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1));

    const fetchSalesAndProducts = async () => {
      setLoadingSales(true);
      try {
        // Fetch Sales
        const salesRes = await axios.get('http://localhost:3333/sales');
        const allSales: Sale[] = salesRes.data;

        // --- Core Fix Here: Filter out invalid dates before processing ---
        const validSales = allSales.filter(sale => {
          const parsedDate = new Date(sale.date);
          return isValid(parsedDate); // Use isValid from date-fns
        });
        // --- End Core Fix ---

        // Limita a 5 últimas vendas para a tabela
        setSales(validSales.slice(0, 5));

        // Calculate Today's Sales Value
        const todayFormatted = format(today, 'yyyy-MM-dd');
        const salesToday = validSales.filter((sale: Sale) => format(new Date(sale.date), 'yyyy-MM-dd') === todayFormatted);
        const totalSalesValueToday = salesToday.reduce((acc: number, sale: Sale) => acc + sale.total, 0);
        setTodaySalesValue(totalSalesValueToday);

        // Calculate Current Month's Sales Value
        const startOfCurrentMonth = startOfMonth(today);
        const endOfCurrentMonth = endOfMonth(today);
        const salesThisMonth = validSales.filter((sale: Sale) => {
          const saleDate = new Date(sale.date);
          return isAfter(saleDate, startOfCurrentMonth) && isBefore(saleDate, endOfCurrentMonth);
        });
        const totalSalesValueThisMonth = salesThisMonth.reduce((acc: number, sale: Sale) => acc + sale.total, 0);
        setTotalMonthSalesValue(totalSalesValueThisMonth);

        // Update calendar days with sales
        const updatedCalendarDays = generateCalendarDays(currentCalendarMonth).map(day => {
          const dayHasSales = validSales.some(sale => isSameDay(new Date(sale.date), day.date));
          return { ...day, hasSales: dayHasSales };
        });
        setCalendarGridDays(updatedCalendarDays);

        // Fetch Products Count
        const productsRes = await axios.get('http://localhost:3333/products');
        setTotalProductsCount(productsRes.data.length);

      } catch (err) {
        console.error('Erro ao buscar dados:', err);
        // Exibir uma mensagem de erro na UI seria bom aqui
      } finally {
        setLoadingSales(false);
      }
    };

    fetchSalesAndProducts();
  }, [currentCalendarMonth]);

  const formatCurrency = (value: number) =>
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-gray-50 overflow-hidden">
        <Sidebar />
        <main className="flex-1 ml-60 p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">Início</h2>
              <p className="text-sm text-gray-500 mt-1">{currentDateString}</p>
            </div>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-lg font-medium transition duration-300 ease-in-out shadow-md text-sm flex items-center gap-2">
              <PlusCircle size={20} weight="bold" /> Nova Venda
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Coluna Principal - Boas-Vindas e Últimas Vendas */}
            <div className="flex flex-col gap-6 w-full lg:w-2/3">
              <div className="bg-purple-600 text-white p-6 rounded-xl shadow-md w-full">
                <h3 className="text-2xl font-bold mb-1">
                  Seja Bem-vindo, <span className="uppercase">Isabela Oliveira</span>!
                </h3>
                <p className="text-base opacity-95">Tenha um ótimo dia, e boas vendas!</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md flex-grow">
                <h4 className="text-xl font-semibold text-gray-800 mb-5">Últimas Vendas</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
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
                            Carregando vendas...
                          </td>
                        </tr>
                      ) : (
                        sales.length > 0 ? (
                          sales.map((venda: Sale) => (
                            <tr key={venda.id} className="border-b border-gray-100 hover:bg-gray-50 transition duration-150 ease-in-out">
                              <td className="py-3 px-2 text-gray-800">{venda.id.slice(0, 8)}</td>
                              <td className="py-3 px-2 text-gray-700">{venda.clientName || 'Cliente Padrão'}</td>
                              <td className="py-3 px-2 text-gray-700 whitespace-nowrap">
                                {
                                  // Re-check isValid here for absolute safety, though filtered above
                                  isValid(new Date(venda.date)) ? format(new Date(venda.date), 'dd/MM/yyyy HH:mm', { locale: ptBR }) : 'Data Inválida'
                                }
                              </td>
                              <td className="py-3 px-2 text-gray-700">{venda.paymentMethod || 'Não Informado'}</td>
                              <td className="py-3 px-2 text-green-600 font-semibold">{formatCurrency(venda.total)}</td>
                              <td className="py-3 px-2">
                                <button className="text-lg text-gray-500 hover:text-purple-600 transition-colors duration-200" title="Ver Detalhes">
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
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Coluna Lateral - Métricas e Calendário */}
            <div className="flex flex-col gap-6 w-full lg:w-1/3">
              {/* Cards de Métricas */}
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
                <div className="bg-white p-5 rounded-xl shadow-md flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Total Vendido Hoje</p>
                    <p className="text-2xl font-extrabold text-purple-700">{formatCurrency(todaySalesValue)}</p>
                  </div>
                  <Tag size={40} weight="duotone" className="text-purple-400 opacity-70" />
                </div>
                <div className="bg-white p-5 rounded-xl shadow-md flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Total Vendido no Mês</p>
                    <p className="text-2xl font-extrabold text-purple-700">{formatCurrency(totalMonthSalesValue)}</p>
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

                {/* Calendário Reduzido */}
                <div className="bg-white p-3 rounded-xl shadow-md text-xs scale-90">
                  <div className="flex justify-between items-center mb-3">
                    <button
                      onClick={goToPreviousMonth}
                      className="text-gray-500 hover:text-purple-600 p-1 rounded-full transition-colors"
                      title="Mês anterior"
                    >
                      <CaretLeft size={16} />
                    </button>
                    <h5 className="font-bold text-center text-gray-800 text-sm">
                      {format(currentCalendarMonth, 'MMMM yyyy', { locale: ptBR }).toUpperCase()}
                    </h5>
                    <button
                      onClick={goToNextMonth}
                      className="text-gray-500 hover:text-purple-600 p-1 rounded-full transition-colors"
                      title="Próximo mês"
                    >
                      <CaretRight size={16} />
                    </button>
                  </div>

                  <div className="grid grid-cols-7 text-center text-[10px] text-gray-500 gap-1 mb-2">
                    {weekDays.map((dia, i) => (
                      <span key={i} className="font-semibold uppercase">{dia}</span>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 text-center text-xs gap-1">
                    {calendarGridDays.map((day) => (
                      <span
                        key={day.key}
                        className={`
                          p-1 rounded-md aspect-square flex items-center justify-center relative
                          ${!day.isCurrentMonth ? 'text-gray-300' : ''}
                          ${day.isCurrentMonth && day.isToday ? 'bg-purple-600 text-white font-bold shadow-sm' : ''}
                          ${day.isCurrentMonth && !day.isToday ? 'text-gray-700 hover:bg-purple-50 cursor-pointer transition-colors' : ''}
                          ${day.hasSales && day.isCurrentMonth ? 'border border-green-400' : ''}
                        `}
                        title={day.hasSales
                          ? `Dia com vendas: ${format(day.date, 'dd/MM/yyyy', { locale: ptBR })}`
                          : format(day.date, 'dd/MM/yyyy', { locale: ptBR })}
                      >
                        {day.dayNumber}
                        {day.hasSales && day.isCurrentMonth && !day.isToday && (
                          <span className="absolute bottom-0.5 right-0.5 h-1 w-1 bg-green-500 rounded-full animate-pulse"></span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>

            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Home;
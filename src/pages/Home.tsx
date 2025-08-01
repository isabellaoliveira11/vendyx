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
} from 'date-fns';
import { ptBR } from 'date-fns/locale';

function Home() {
  const [sales, setSales] = useState([]);
  const [currentDate, setCurrentDate] = useState('');
  const [currentMonthSales, setCurrentMonthSales] = useState(0);
  const [todaySalesCount, setTodaySalesCount] = useState(0);

  // --- Estados e lógicas para o Calendário Dinâmico ---
  const [currentCalendarMonth, setCurrentCalendarMonth] = useState(new Date());

  const weekDays = ['seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom'];

  const generateCalendarDays = (date: Date) => {
    const startOfMonthDate = startOfMonth(date);
    const dayOfWeekOfFirstDayOfMonth = getDay(startOfMonthDate);

    let adjustStartDays = 0;
    if (dayOfWeekOfFirstDayOfMonth === 0) { // Se for domingo (0), precisa voltar 6 dias para ir para a segunda anterior
        adjustStartDays = 6;
    } else { // Ajusta para que segunda-feira seja o índice 0 na sua lógica
        adjustStartDays = dayOfWeekOfFirstDayOfMonth - 1;
    }

    const startGridDay = new Date(startOfMonthDate);
    startGridDay.setDate(startOfMonthDate.getDate() - adjustStartDays);

    const allDaysInGrid = eachDayOfInterval({
      start: startGridDay,
      end: new Date(startGridDay.getTime() + (41 * 24 * 60 * 60 * 1000)) // 42 dias no total (6 semanas)
    });

    return allDaysInGrid.map(d => ({
      date: d,
      dayNumber: format(d, 'd'),
      isToday: isSameDay(d, new Date()),
      isCurrentMonth: isSameMonth(d, date),
      key: format(d, 'yyyy-MM-dd')
    }));
  };

  const calendarGridDays = generateCalendarDays(currentCalendarMonth);

  const goToPreviousMonth = () => {
    setCurrentCalendarMonth(subMonths(currentCalendarMonth, 1));
  };

  const goToNextMonth = () => {
    setCurrentCalendarMonth(addMonths(currentCalendarMonth, 1));
  };
  // --- Fim da lógica do Calendário ---

  useEffect(() => {
    const today = new Date();
    // A data atual correta é Sexta-feira, 01/08/2025
    const formattedDate = format(today, "EEEE, dd/MM/yyyy", { locale: ptBR });
    setCurrentDate(formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1));

    axios.get('http://localhost:3333/sales')
      .then(res => {
        const allSales = res.data;
        setSales(allSales.slice(0, 5));

        const todayFormatted = format(today, 'dd/MM/yyyy');
        const salesToday = allSales.filter((sale: any) => format(new Date(sale.date), 'dd/MM/yyyy') === todayFormatted);
        setTodaySalesCount(salesToday.length);

        const currentMonthNum = today.getMonth();
        const salesThisMonth = allSales.filter((sale: any) => new Date(sale.date).getMonth() === currentMonthNum);
        const totalSalesValueThisMonth = salesThisMonth.reduce((acc: number, sale: any) => acc + sale.total, 0);
        setCurrentMonthSales(totalSalesValueThisMonth);
      })
      .catch(err => console.error('Erro ao buscar vendas', err));
  }, []);

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-gray-50 overflow-hidden">
        <Sidebar />

        <main className="flex-1 ml-60 p-6"> {/* p-6 para um padding geral um pouco menor */}
          <div className="flex justify-between items-center mb-6"> {/* mb-6 para mais compacto */}
            <div>
              <h2 className="text-xl font-normal text-gray-800">Home</h2>
              <p className="text-sm text-gray-500 mt-0">{currentDate}</p>
            </div>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-lg font-medium transition duration-300 ease-in-out shadow-md text-sm"> {/* px-5 py-2.5 e text-sm no botão */}
              + Nova venda
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* CARD DE BOAS-VINDAS - AGORA NO TOPO DA COLUNA DA ESQUERDA, PEQUENO E ALINHADO */}
            <div className="col-span-2 flex flex-col gap-6"> {/* Novo container para a tabela e o card de boas-vindas */}
                <div className="bg-purple-600 text-white p-4 rounded-lg shadow-md w-full"> {/* p-4, w-full para se encaixar no grid */}
                    <h3 className="text-xl font-semibold mb-0.5"> {/* Mantido o tamanho do título */}
                      Seja Bem-vindo, <span className="uppercase font-bold">ISABELA OLIVEIRA</span>
                    </h3>
                    <p className="text-sm opacity-90">Tenha um ótimo dia, e boas vendas!</p> {/* Texto menor */}
                </div>

                {/* CARD DA TABELA DE ÚLTIMAS VENDAS - OCUPANDO O RESTO DO ESPAÇO */}
                <div className="bg-white p-6 rounded-lg shadow-md flex-grow"> {/* flex-grow para expandir */}
                  <h4 className="text-lg font-bold text-gray-800 mb-4">Últimas vendas</h4>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left border-b border-gray-200 text-gray-500 uppercase font-semibold">
                        <th className="py-3 px-2">Cod. Venda</th>
                        <th className="py-3 px-2">Tipo de PAG</th>
                        <th className="py-3 px-2">Qnt. Itens</th>
                        <th className="py-3 px-2">Valor da venda</th>
                        <th className="py-3 px-2">Ação</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sales.length > 0 ? (
                        sales.map((venda: any) => (
                          <tr key={venda.id} className="border-b border-gray-100 hover:bg-gray-50 transition duration-150 ease-in-out">
                            <td className="py-2 px-2 text-gray-800">{venda.id.slice(0, 8)}</td>
                            <td className="py-2 px-2 text-gray-700">{venda.paymentType || 'Cartão'}</td>
                            <td className="py-2 px-2 text-gray-700">{venda.itemsCount}</td>
                            <td className="py-2 px-2 text-purple-600 font-semibold">{formatCurrency(venda.total)}</td>
                            <td className="py-2 px-2">
                              <button
                                className="text-lg text-gray-500 hover:text-purple-600 transition-colors duration-200"
                                title="Detalhes"
                              >
                                &#x24D8;
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="py-4 text-center text-gray-500">Nenhuma venda recente encontrada.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
            </div>


            {/* COLUNA DA DIREITA - AGORA MUITO MAIS COMPACTA */}
            <div className="flex flex-col gap-4">
              {/* CALENDÁRIO - DIMINUÍDO AO MÁXIMO */}
              <div className="bg-white p-2 rounded-lg shadow-md flex-shrink-0"> {/* Reduzido de p-3 para p-2 */}
                <div className="flex justify-between items-center mb-1"> {/* Reduzido de mb-2 para mb-1 */}
                  <button onClick={goToPreviousMonth} className="text-gray-500 hover:text-purple-600 p-0.5 rounded-full text-xs">
                    &#8249;
                  </button>
                  <h5 className="font-bold text-center text-gray-800 text-xs"> {/* Reduzido de text-sm para text-xs */}
                    {format(currentCalendarMonth, 'MMMM yyyy', { locale: ptBR }).toUpperCase()}
                  </h5>
                  <button onClick={goToNextMonth} className="text-gray-500 hover:text-purple-600 p-0.5 rounded-full text-xs">
                    &#8250;
                  </button>
                </div>

                <div className="grid grid-cols-7 text-center text-xs text-gray-500 gap-px mb-0.5"> {/* text-xs e gap-px */}
                  {weekDays.map((dia, i) => (
                    <span key={i} className="font-semibold uppercase">{dia}</span>
                  ))}
                </div>

                <div className="grid grid-cols-7 text-center text-xs gap-px"> {/* text-xs e gap-px para os dias */}
                  {calendarGridDays.map((day) => (
                    <span
                      key={day.key}
                      className={`
                        p-0.5 rounded-md aspect-square flex items-center justify-center
                        ${!day.isCurrentMonth ? 'text-gray-300' : ''}
                        ${day.isCurrentMonth && day.isToday ? 'bg-purple-600 text-white font-bold' : ''}
                        ${day.isCurrentMonth && !day.isToday ? 'text-gray-700 hover:bg-gray-100 cursor-pointer' : ''}
                      `}
                    >
                      {day.dayNumber}
                    </span>
                  ))}
                </div>
              </div>

              {/* CARDS DE VENDAS HOJE/MÊS - DIMINUÍDOS E COM MAIS RESPIRO ENTRE ELES */}
              {/* Vamos usar flex-col para o container e gap para espaçamento */}
              <div className="flex flex-col gap-4"> {/* Separado para ter seu próprio gap */}
                <div className="bg-purple-600 text-white text-center p-3 rounded-lg shadow-md"> {/* p-3 */}
                  <p className="text-sm mb-0.5 opacity-90">Vendas hoje:</p>
                  <p className="text-2xl font-extrabold">{todaySalesCount}</p>
                </div>
                <div className="bg-purple-600 text-white text-center p-3 rounded-lg shadow-md"> {/* p-3 */}
                  <p className="text-sm mb-0.5 opacity-90">Vendas Mês:</p>
                  <p className="text-2xl font-extrabold">{formatCurrency(currentMonthSales)}</p>
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
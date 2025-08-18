import { useState, useEffect } from 'react';
import { ChartBar, Tag, CurrencyDollar, Package } from 'phosphor-react';
import axios from 'axios';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import { useSummary } from '../hooks/useSummary';

interface SaleReportData {
  id: string;
  clientName: string;
  total: number;
  paymentMethod: string | null;
  createdAt: string;
}

interface CategoryData {
  id: string;
  name: string;
}

const API_BASE = 'http://localhost:3333';
const COLORS = ['#8b5cf6', '#22c55e', '#f59e0b', '#ef4444'];

export default function Reports() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [reportData, setReportData] = useState<SaleReportData[] | null>(null);
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [, setError] = useState<string | null>(null);
  const summary = useSummary();
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const [{ data: categories }, { data: chart }] = await Promise.all([
          axios.get(`${API_BASE}/categories`),
          axios.get(`${API_BASE}/sales/chart`),
        ]);

        setCategories(categories);
        setChartData(chart.length ? chart : [
          { name: 'Categoria A', value: 300 },
          { name: 'Categoria B', value: 500 },
          { name: 'Categoria C', value: 200 },
        ]);
      } catch (err) {
        setChartData([
          { name: 'Categoria A', value: 300 },
          { name: 'Categoria B', value: 500 },
          { name: 'Categoria C', value: 200 },
        ]);
      }
    })();
  }, []);

  const handleGenerateReport = async () => {
    setIsLoading(true);
    setError(null);
    setReportData(null);
    try {
      const { data } = await axios.get<SaleReportData[]>(`${API_BASE}/sales/report`, {
        params: {
          ...(startDate && { startDate }),
          ...(endDate && { endDate }),
          ...(paymentMethod && { paymentMethod }),
          ...(categoryId && { categoryId }),
        },
      });
      setReportData(data);
    } catch (err: any) {
      setError(err?.message || 'Erro ao buscar relatório.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <ChartBar size={32} className="text-purple-700" weight="duotone" />
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Relatórios</h2>
          <p className="text-sm text-gray-600">Gere relatórios e visualize estatísticas de desempenho.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white p-4 rounded-2xl shadow-md border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="input" />
              <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="input" />
              <select value={categoryId} onChange={e => setCategoryId(e.target.value)} className="input bg-white">
                <option value="">Todas</option>
                {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
              </select>
              <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)} className="input bg-white">
                <option value="">Todas</option>
                <option value="Pix">Pix</option>
                <option value="Dinheiro">Dinheiro</option>
                <option value="Cartão">Cartão</option>
              </select>
              <button onClick={handleGenerateReport} disabled={isLoading} className="w-full bg-purple-600 text-white px-4 py-2.5 rounded-lg shadow hover:bg-purple-700 transition disabled:bg-purple-300">
                {isLoading ? 'Gerando...' : 'Gerar Relatório'}
              </button>
            </div>
          </div>

          {reportData && (
            <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Vendas encontradas</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[640px]">
                  <thead>
                    <tr className="bg-gray-50 border-b text-gray-500 text-xs uppercase">
                      <th className="px-3 py-2 text-left">Data</th>
                      <th className="px-3 py-2 text-left">Cliente</th>
                      <th className="px-3 py-2 text-left">Pagamento</th>
                      <th className="px-3 py-2 text-right">Valor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportData.length > 0 ? reportData.map(sale => (
                      <tr key={sale.id} className="border-b hover:bg-gray-50 text-gray-800">
                        <td className="px-3 py-2">{new Date(sale.createdAt).toLocaleDateString('pt-BR')}</td>
                        <td className="px-3 py-2">{sale.clientName}</td>
                        <td className="px-3 py-2">{sale.paymentMethod || 'N/A'}</td>
                        <td className="px-3 py-2 text-right font-medium">
                          {sale.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={4} className="py-4 text-center text-gray-500">Nenhuma venda encontrada.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Distribuição de Vendas por Categoria</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} labelLine={false} label={({ name }) => name}>
                      {chartData.map((_, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: any) => `R$ ${value}`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Vendas Semanais</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={[
                    { dia: 'Seg', total: 1200 },
                    { dia: 'Ter', total: 1800 },
                    { dia: 'Qua', total: 1600 },
                    { dia: 'Qui', total: 2000 },
                    { dia: 'Sex', total: 2450 },
                    { dia: 'Sáb', total: 1900 },
                    { dia: 'Dom', total: 1000 },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="dia" />
                    <YAxis />
                    <Tooltip formatter={(value: any) => `R$ ${value}`} />
                    <Legend />
                    <Line type="monotone" dataKey="total" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <SummaryCard title="Total Vendido Hoje" value={summary.totalToday.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} color="purple" icon={<Tag size={20} />} />
          <SummaryCard title="Total no Mês" value={summary.totalMonth.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} color="green" icon={<CurrencyDollar size={20} />} />
          <SummaryCard title="Produtos Cadastrados" value={summary.totalProducts.toString()} color="sky" icon={<Package size={20} />} />
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ title, value, color, icon }: { title: string; value: string; color: 'purple' | 'green' | 'sky'; icon: React.ReactNode }) {
  const bgMap = {
    purple: 'bg-purple-100 text-purple-600',
    green: 'bg-green-100 text-green-600',
    sky: 'bg-sky-100 text-sky-600',
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100 flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500 mb-0.5">{title}</p>
        <p className="text-2xl font-medium text-gray-800">{value}</p>
      </div>
      <div className={`rounded-full p-2.5 ${bgMap[color]}`}>{icon}</div>
    </div>
  );
}

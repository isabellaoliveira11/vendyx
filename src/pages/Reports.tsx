// src/pages/Reports.tsx
import { useState, useEffect } from 'react';
import { ChartBar, Tag, CurrencyDollar, Package } from 'phosphor-react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import axios from 'axios';

// Interface para os dados da venda
interface SaleReportData {
  id: string;
  clientName: string;
  total: number;
  paymentMethod: string | null;
  createdAt: string;
}

// Interface para os dados da categoria
interface CategoryData {
  id: string;
  name: string;
}

function Reports() {
  // Estados dos filtros
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [categoryId, setCategoryId] = useState('');

  // Estados dos dados
  const [reportData, setReportData] = useState<SaleReportData[] | null>(null);
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Buscamos as categorias quando o componente é montado
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('http://localhost:3333/categories');
        setCategories(res.data);
      } catch (err) {
        console.error("Erro ao buscar categorias", err);
      }
    };
    fetchCategories();
  }, []);

  // Função para gerar o relatório
  const handleGenerateReport = async () => {
    setIsLoading(true);
    setError(null);
    setReportData(null);

    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    if (paymentMethod) params.append('paymentMethod', paymentMethod);
    if (categoryId) params.append('categoryId', categoryId);

    const API_URL = `http://localhost:3333/sales/report`;

    try {
      const response = await fetch(`${API_URL}?${params.toString()}`);
      if (!response.ok) {
        throw new Error('Falha ao buscar dados do relatório.');
      }
      const data: SaleReportData[] = await response.json();
      setReportData(data);
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro desconhecido.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 p-6">
          {/* Cabeçalho */}
          <div className="flex items-center gap-3 mb-6">
            <ChartBar size={32} className="text-purple-700" weight="duotone" />
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Relatórios</h2>
              <p className="text-sm text-gray-600 mt-0.5">
                Gere relatórios e visualize estatísticas de desempenho.
              </p>
            </div>
          </div>

          {/* Filtros rápidos */}
          <div className="bg-white p-4 rounded-xl shadow-md border border-purple-100 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="flex flex-col">
                <label className="text-xs font-semibold text-gray-600 mb-1">Data inicial</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full p-2 rounded-lg border border-gray-300 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-xs font-semibold text-gray-600 mb-1">Data final</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full p-2 rounded-lg border border-gray-300 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-xs font-semibold text-gray-600 mb-1">Categoria</label>
                <select 
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full p-2 rounded-lg border border-gray-300 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                >
                  <option value="">Todas</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-xs font-semibold text-gray-600 mb-1">Forma de pagamento</label>
                <select 
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full p-2 rounded-lg border border-gray-300 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                >
                  <option value="">Todas</option>
                  <option value="money">Dinheiro</option>
                  <option value="pix">Pix</option>
                  <option value="card">Cartão</option>
                </select>
              </div>

              <div className="flex items-end">
                <button 
                  onClick={handleGenerateReport}
                  disabled={isLoading}
                  className="w-full bg-purple-600 text-white px-4 py-2.5 rounded-lg shadow hover:bg-purple-700 transition disabled:bg-purple-300"
                >
                  {isLoading ? 'Gerando...' : 'Gerar Relatório'}
                </button>
              </div>
            </div>
          </div>

          {/* Área para exibir os resultados do relatório */}
          <div className="mt-6">
            {isLoading && <p className="text-center text-purple-700">Carregando dados...</p>}
            {error && <p className="text-center text-red-500 bg-red-100 p-3 rounded-lg">{error}</p>}
            {reportData && (
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md border border-purple-100">
                <h3 className="text-lg font-bold text-purple-700 mb-4">Resultados do Relatório</h3>
                {reportData.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b bg-gray-50">
                          <th className="p-3 text-sm font-semibold text-gray-600">Data</th>
                          <th className="p-3 text-sm font-semibold text-gray-600">Cliente</th>
                          <th className="p-3 text-sm font-semibold text-gray-600">Forma Pgto.</th>
                          <th className="p-3 text-sm font-semibold text-gray-600 text-right">Valor Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reportData.map((sale) => (
                          <tr key={sale.id} className="border-b hover:bg-purple-50">
                            <td className="p-3 text-sm text-gray-800">{new Date(sale.createdAt).toLocaleDateString('pt-BR')}</td>
                            <td className="p-3 text-sm text-gray-800">{sale.clientName}</td>
                            <td className="p-3 text-sm text-gray-800">{sale.paymentMethod || 'N/A'}</td>
                            <td className="p-3 text-sm text-gray-800 font-medium text-right">{sale.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-center text-gray-500 py-4">Nenhuma venda encontrada para os filtros selecionados.</p>
                )}
              </div>
            )}
          </div>

          {/* O resto do seu dashboard continua aqui... */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <div className="bg-white p-6 rounded-xl shadow-md border border-purple-100">
              <h4 className="text-lg font-semibold text-purple-700 mb-4">Vendas por categoria</h4>
              <div className="flex items-center justify-center h-56 text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
                (Gráfico aqui futuramente)
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="bg-white p-5 rounded-xl shadow-md flex items-center justify-between border border-purple-100">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total Vendido Hoje</p>
                  <p className="text-2xl font-extrabold text-purple-700">R$ 50,00</p>
                </div>
                <Tag size={40} weight="duotone" className="text-purple-400 opacity-70" />
              </div>
              <div className="bg-white p-5 rounded-xl shadow-md flex items-center justify-between border border-purple-100">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total Vendido no Mês</p>
                  <p className="text-2xl font-extrabold text-purple-700">R$ 298,93</p>
                </div>
                <CurrencyDollar size={40} weight="duotone" className="text-purple-400 opacity-70" />
              </div>
              <div className="bg-white p-5 rounded-xl shadow-md flex items-center justify-between border border-purple-100">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Produtos Cadastrados</p>
                  <p className="text-2xl font-extrabold text-purple-700">4</p>
                </div>
                <Package size={40} weight="duotone" className="text-purple-400 opacity-70" />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Reports;

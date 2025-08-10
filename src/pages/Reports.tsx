// src/pages/Reports.tsx
import { ChartBar, Tag, CurrencyDollar, Package } from 'phosphor-react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

function Reports() {
  return (
    <>
      <Navbar />

      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />

        <main className="flex-1 p-6"> {/* highlight-line */}
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex flex-col">
                <label className="text-xs font-semibold text-gray-600 mb-1">Data inicial</label>
                <input
                  type="date"
                  className="w-full p-2 rounded-lg border border-gray-300 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-xs font-semibold text-gray-600 mb-1">Data final</label>
                <input
                  type="date"
                  className="w-full p-2 rounded-lg border border-gray-300 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-xs font-semibold text-gray-600 mb-1">Forma de pagamento</label>
                <select className="w-full p-2 rounded-lg border border-gray-300 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white">
                  <option value="">Todas</option>
                  <option value="money">Dinheiro</option>
                  <option value="pix">Pix</option>
                  <option value="card">Cartão</option>
                </select>
              </div>

              <div className="flex items-end">
                <button className="w-full bg-purple-600 text-white px-4 py-2.5 rounded-lg shadow hover:bg-purple-700 transition">
                  Gerar Relatório
                </button>
              </div>
            </div>
          </div>

          {/* Cards de relatórios específicos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Relatório de Vendas */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-purple-100">
              <h3 className="text-lg font-bold text-purple-700 mb-4">Relatório de Vendas</h3>
              <p className="text-sm text-gray-500 mb-4">
                Baixe ou visualize o relatório consolidado de vendas filtrado por período e forma de pagamento.
              </p>
              <div className="flex gap-3">
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-700 transition">
                  Visualizar
                </button>
                <button className="bg-white text-purple-700 border border-purple-200 px-4 py-2 rounded-lg hover:bg-purple-50 transition">
                  Exportar CSV
                </button>
              </div>
            </div>

            {/* Relatório de Produtos */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-purple-100">
              <h3 className="text-lg font-bold text-purple-700 mb-4">Relatório de Produtos</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <select className="w-full p-2 rounded-lg border border-gray-300 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white">
                  <option>Categoria (todas)</option>
                </select>
                <select className="w-full p-2 rounded-lg border border-gray-300 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white">
                  <option>Disponibilidade (todas)</option>
                  <option>Com estoque</option>
                  <option>Sem estoque</option>
                </select>
              </div>
              <div className="flex gap-3">
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-700 transition">
                  Visualizar
                </button>
                <button className="bg-white text-purple-700 border border-purple-200 px-4 py-2 rounded-lg hover:bg-purple-50 transition">
                  Exportar CSV
                </button>
              </div>
            </div>
          </div>

          {/* Dashboard: gráfico + estatísticas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Gráfico (placeholder) */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-purple-100">
              <h4 className="text-lg font-semibold text-purple-700 mb-4">Vendas por categoria</h4>
              <div className="flex items-center justify-center h-56 text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
                (Gráfico aqui futuramente)
              </div>
            </div>

            {/* Cards de estatísticas */}
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
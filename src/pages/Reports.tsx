import { ChartBar, Tag, CurrencyDollar, Package } from 'phosphor-react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import PageWrapper from '../components/PageWrapper';

function Reports() {
  return (
    <>
      <Navbar />
      <PageWrapper>
        <div className="flex min-h-screen gap-6">
          <Sidebar />

          <main className="flex-1 pt-6">
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

            {/* Relatórios em Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Relatório de Vendas */}
              <div className="bg-white p-6 rounded-xl shadow-md border border-purple-100">
                <h3 className="text-lg font-bold text-purple-700 mb-4">Relatório de Vendas</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <input
                    type="date"
                    className="w-full p-2 rounded-md border border-gray-300 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    type="date"
                    className="w-full p-2 rounded-md border border-gray-300 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <select className="w-full p-2 rounded-md border border-gray-300 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option>Todos</option>
                    <option>Dinheiro</option>
                    <option>Pix</option>
                    <option>Cartão</option>
                  </select>
                </div>
                <button className="bg-purple-600 text-white px-4 py-2 rounded shadow hover:bg-purple-700 transition">
                  Gerar Relatório
                </button>
              </div>

              {/* Relatório de Produtos */}
              <div className="bg-white p-6 rounded-xl shadow-md border border-purple-100">
                <h3 className="text-lg font-bold text-purple-700 mb-4">Relatório de Produtos</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <select className="w-full p-2 rounded-md border border-gray-300 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option>Categoria</option>
                  </select>
                  <select className="w-full p-2 rounded-md border border-gray-300 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option>Disponível</option>
                  </select>
                </div>
                <button className="bg-purple-600 text-white px-4 py-2 rounded shadow hover:bg-purple-700 transition">
                  Gerar Relatório
                </button>
              </div>
            </div>

            {/* Dashboard: gráfico + estatísticas */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Gráfico */}
              <div className="bg-white p-6 rounded-xl shadow-md border border-purple-100">
                <h4 className="text-lg font-semibold text-purple-700 mb-4">Vendas por categoria</h4>
                <div className="flex items-center justify-center h-40 text-gray-400">
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
      </PageWrapper>
    </>
  );
}

export default Reports;

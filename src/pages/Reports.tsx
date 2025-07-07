import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

function Reports() {
  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />

        <main className="flex-1 ml-60 p-6">
          <h2 className="text-2xl font-bold text-purple-800 mb-6">
            Relatórios e Dashboard
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Relatório de Vendas */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-bold text-purple-600 mb-4">Gerar Relatório de Vendas</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <input type="date" className="border p-2 rounded" placeholder="Data Inicial" />
                <input type="date" className="border p-2 rounded" placeholder="Data Final" />
                <select className="border p-2 rounded">
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
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-bold text-purple-600 mb-4">Gerar Relatório de Produtos</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <select className="border p-2 rounded">
                  <option>Categoria</option>
                </select>
                <select className="border p-2 rounded">
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
            {/* Placeholder para gráfico */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h4 className="text-lg font-semibold text-purple-600 mb-4">Vendas por categoria</h4>
              <div className="flex items-center justify-center h-40 text-gray-400">
                (Gráfico aqui futuramente)
              </div>
            </div>

            {/* Cards de estatísticas */}
            <div className="flex flex-col gap-4">
              <div className="bg-purple-500 text-white text-center p-4 rounded-xl shadow-md">
                <p className="text-sm">Vendas do dia</p>
                <p className="text-3xl font-bold">1</p>
              </div>
              <div className="bg-purple-500 text-white text-center p-4 rounded-xl shadow-md">
                <p className="text-sm">Valor vendido no mês</p>
                <p className="text-3xl font-bold">R$ 890,00</p>
              </div>
              <div className="bg-purple-500 text-white text-center p-4 rounded-xl shadow-md">
                <p className="text-sm">Top categoria do ano</p>
                <p className="text-2xl font-bold">categoria teste 1</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Reports;

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

function Home() {
  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />

        <main className="flex-1 ml-60 p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Home</h2>
              <p className="text-sm text-gray-500">
                Terça-feira, <span className="text-purple-500">30/07/2024</span>
              </p>
            </div>
            <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-full font-medium transition">
              + Nova venda
            </button>
          </div>

          {/* Cartão de boas-vindas */}
          <div className="bg-purple-500 text-white p-6 rounded-xl flex items-center justify-between mb-6 shadow-md">
            <div>
              <h3 className="text-lg font-semibold">
                Seja Bem-vindo, <span className="uppercase font-bold">ISABELA OLIVEIRA</span>
              </h3>
              <p className="text-sm">Tenha um ótimo dia, e boas vendas</p>
            </div>
            <span className="text-white text-2xl">🔄</span>
          </div>

          {/* Conteúdo principal */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Tabela de vendas */}
            <div className="col-span-2 bg-white p-6 rounded-xl shadow-md">
              <h4 className="text-lg font-semibold text-purple-600 mb-4">Últimas vendas</h4>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b text-gray-600">
                    <th className="py-2">Cod. Venda</th>
                    <th>Tipo de PAG</th>
                    <th>Qnt. Itens</th>
                    <th>Valor da venda</th>
                    <th>Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: 5, tipo: 'dinheiro', itens: 1, valor: 166 },
                    { id: 4, tipo: 'cartao/debito', itens: 1, valor: 80 },
                    { id: 3, tipo: 'cartao/credito', itens: 1, valor: 190 },
                    { id: 2, tipo: 'pix', itens: 1, valor: 180 },
                    { id: 1, tipo: 'pix', itens: 1, valor: 190 },
                  ].map(venda => (
                    <tr key={venda.id} className="border-b hover:bg-gray-50 transition">
                      <td className="py-2">{venda.id}</td>
                      <td>{venda.tipo}</td>
                      <td>{venda.itens}</td>
                      <td className="text-purple-600 font-semibold">R$ {venda.valor.toFixed(2)}</td>
                      <td className="text-lg">🖨️</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Lateral com calendário e estatísticas */}
            <div className="space-y-4">
              {/* Calendário */}
              <div className="bg-white p-4 rounded-xl shadow-md">
                <h5 className="font-semibold text-center text-gray-700 mb-2">JULHO 2024</h5>
                <div className="grid grid-cols-7 text-center text-sm text-gray-500 gap-1">
                  {['S', 'T', 'Q', 'Q', 'S', 'S', 'D'].map((dia, i) => (
                    <span key={i} className="font-bold">{dia}</span>
                  ))}
                  {[...Array(31)].map((_, i) => (
                    <span
                      key={i}
                      className={`p-1 rounded ${i + 1 === 30 ? 'bg-purple-500 text-white' : 'hover:bg-gray-200'} transition`}
                    >
                      {i + 1}
                    </span>
                  ))}
                </div>
              </div>

              {/* Estatísticas */}
              <div className="bg-purple-500 text-white text-center p-4 rounded-xl shadow-md">
                <p className="text-sm">Vendas hoje:</p>
                <p className="text-3xl font-bold">4</p>
              </div>
              <div className="bg-purple-500 text-white text-center p-4 rounded-xl shadow-md">
                <p className="text-sm">Vendas Mês:</p>
                <p className="text-3xl font-bold">5</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Home;

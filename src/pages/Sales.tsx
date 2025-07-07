import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import SaleForm from '../components/SalesForm';

function Sales() {
  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-purple-50">
        <Sidebar />

        <main className="ml-60 flex-1 p-8">
          <h2 className="text-3xl font-bold text-purple-800 mb-8 text-center">
            Página de vendas
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* FORMULÁRIO DE NOVA VENDA */}
            <SaleForm />

            {/* LISTAGEM DAS VENDAS */}
            <div className="bg-white p-6 rounded-xl shadow-md w-full border border-purple-200">
              <h3 className="text-xl font-semibold text-purple-700 mb-4 text-center">
                Todas as vendas
              </h3>

              <table className="w-full text-sm border-separate border-spacing-y-2">
                <thead>
                  <tr className="text-left text-purple-700">
                    <th className="py-2 px-3 bg-purple-100 rounded-l">Cod.</th>
                    <th className="py-2 px-3 bg-purple-100">Tipo de PAG</th>
                    <th className="py-2 px-3 bg-purple-100">Qtd. Itens</th>
                    <th className="py-2 px-3 bg-purple-100">Valor</th>
                    <th className="py-2 px-3 bg-purple-100 rounded-r">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-purple-50 hover:bg-purple-100 transition rounded">
                    <td className="px-3 py-2">1</td>
                    <td className="px-3 py-2">Dinheiro</td>
                    <td className="px-3 py-2">3</td>
                    <td className="px-3 py-2">R$ 400,00</td>
                    <td className="px-3 py-2 flex gap-2">
                      <button className="text-blue-600 hover:scale-110 transition">📝</button>
                      <button className="text-red-500 hover:scale-110 transition">🗑</button>
                    </td>
                  </tr>
                  <tr className="bg-purple-50 hover:bg-purple-100 transition rounded">
                    <td className="px-3 py-2">2</td>
                    <td className="px-3 py-2">Pix</td>
                    <td className="px-3 py-2">1</td>
                    <td className="px-3 py-2">R$ 200,00</td>
                    <td className="px-3 py-2 flex gap-2">
                      <button className="text-blue-600 hover:scale-110 transition">📝</button>
                      <button className="text-red-500 hover:scale-110 transition">🗑</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Sales;

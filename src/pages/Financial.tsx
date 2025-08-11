// src/pages/Financial.tsx
import {
  FaDollarSign,
  FaArrowCircleUp,
  FaArrowCircleDown,
  FaPlus,
  FaWallet,
} from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

// Dados mocados para a tabela de lançamentos
const mockTransactions = [
  {
    id: 1,
    description: 'Venda do pedido #c675',
    date: '2025-08-11',
    type: 'Entrada',
    amount: 449.55,
  },
  {
    id: 2,
    description: 'Pagamento fornecedor de embalagens',
    date: '2025-08-10',
    type: 'Saída',
    amount: 150.0,
  },
  {
    id: 3,
    description: 'Venda do pedido #29e4',
    date: '2025-08-09',
    type: 'Entrada',
    amount: 99.9,
  },
  {
    id: 4,
    description: 'Compra de matéria-prima',
    date: '2025-08-08',
    type: 'Saída',
    amount: 320.0,
  },
];

function Financial() {
  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 p-6">
          {/* Cabeçalho */}
          <div className="flex items-center gap-3 mb-6">
            <FaDollarSign size={28} className="text-purple-700" />
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Financeiro</h2>
              <p className="text-sm text-gray-600 mt-0.5">
                Controle suas entradas, saídas e saldo.
              </p>
            </div>
          </div>

          {/* Cards de Resumo */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-5 rounded-xl shadow-md border border-green-200">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500">Saldo Atual</p>
                  <p className="text-2xl font-bold text-green-600">R$ 1.879,45</p>
                </div>
                <FaWallet size={24} className="text-green-500" />
              </div>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-md border border-blue-200">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500">Entradas (Mês)</p>
                  <p className="text-2xl font-bold text-blue-600">R$ 2.349,45</p>
                </div>
                <FaArrowCircleUp size={24} className="text-blue-500" />
              </div>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-md border border-red-200">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500">Saídas (Mês)</p>
                  <p className="text-2xl font-bold text-red-600">R$ 470,00</p>
                </div>
                <FaArrowCircleDown size={24} className="text-red-500" />
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-5 gap-6">
            {/* Formulário de Lançamento */}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-md border border-purple-200 h-fit">
              <h3 className="text-lg font-semibold text-purple-700 mb-4">Novo Lançamento</h3>
              <form className="space-y-4">
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descrição</label>
                  <input type="text" id="description" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm" placeholder="Ex: Venda do pedido #123" />
                </div>
                <div>
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Valor</label>
                  <input type="number" id="amount" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm" placeholder="0,00" />
                </div>
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700">Tipo</label>
                  <select id="type" className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm">
                    <option>Entrada</option>
                    <option>Saída</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700">Data</label>
                  <input type="date" id="date" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm" />
                </div>
                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                  <FaPlus className="mr-2" />
                  Adicionar Lançamento
                </button>
              </form>
            </div>

            {/* Tabela de Últimos Lançamentos */}
            <div className="lg:col-span-3 bg-white p-6 rounded-2xl shadow-md border border-purple-200">
              <h3 className="text-lg font-semibold text-purple-700 mb-4">Últimos Lançamentos</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-700">
                  <thead className="text-xs text-purple-800 uppercase bg-purple-100">
                    <tr>
                      <th scope="col" className="px-6 py-3 rounded-l-md">Descrição</th>
                      <th scope="col" className="px-6 py-3">Data</th>
                      <th scope="col" className="px-6 py-3">Tipo</th>
                      <th scope="col" className="px-6 py-3 rounded-r-md text-right">Valor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockTransactions.map((transaction) => (
                      <tr key={transaction.id} className="bg-white border-b hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                          {transaction.description}
                        </td>
                        <td className="px-6 py-4">
                          {new Date(transaction.date).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            transaction.type === 'Entrada'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {transaction.type}
                          </span>
                        </td>
                        <td className={`px-6 py-4 text-right font-medium ${
                          transaction.type === 'Entrada' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.type === 'Entrada' ? '+' : '-'} R$ {transaction.amount.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Financial;

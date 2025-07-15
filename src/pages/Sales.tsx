import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import SaleForm from '../components/SalesForm'
import axios from 'axios'

type Sale = {
  id: string
  clientName: string
  total: number
  createdAt: string
  itemsCount: number
}

function Sales() {
  const [sales, setSales] = useState<Sale[]>([])

  const fetchVendas = () => {
    axios.get('http://localhost:3333/sales')
      .then(res => setSales(res.data))
      .catch(err => console.error('Erro ao buscar vendas', err))
  }

  useEffect(() => {
    fetchVendas()
  }, [])

  const handleDelete = async (id: string) => {
    const confirmar = confirm('Tem certeza que deseja excluir esta venda?')
    if (!confirmar) return

    try {
      await axios.delete(`http://localhost:3333/sales/${id}`)
      setSales(prev => prev.filter(sale => sale.id !== id))
    } catch (err) {
      alert('Erro ao deletar venda.')
    }
  }

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
            <SaleForm onVendaCriada={fetchVendas} />

            <div className="bg-white p-6 rounded-xl shadow-md w-full border border-purple-200">
              <h3 className="text-xl font-semibold text-purple-700 mb-4 text-center">
                Todas as vendas
              </h3>

              <table className="w-full text-sm border-separate border-spacing-y-2">
                <thead>
                  <tr className="text-left text-purple-700">
                    <th className="py-2 px-3 bg-purple-100 rounded-l">Cod.</th>
                    <th className="py-2 px-3 bg-purple-100">Cliente</th>
                    <th className="py-2 px-3 bg-purple-100">Qtd. Itens</th>
                    <th className="py-2 px-3 bg-purple-100">Valor</th>
                    <th className="py-2 px-3 bg-purple-100 rounded-r">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {sales.map((venda) => (
                    <tr key={venda.id} className="bg-purple-50 hover:bg-purple-100 transition rounded">
                      <td className="px-3 py-2">{venda.id.slice(0, 4)}</td>
                      <td className="px-3 py-2">{venda.clientName}</td>
                      <td className="px-3 py-2">{venda.itemsCount}</td>
                      <td className="px-3 py-2">R$ {venda.total.toFixed(2)}</td>
                      <td className="px-3 py-2 flex gap-2">
                        <button
                          className="text-blue-600 hover:scale-110 transition"
                          onClick={() => alert('Função de edição ainda não implementada')}
                        >
                          📝
                        </button>
                        <button
                          className="text-red-500 hover:scale-110 transition"
                          onClick={() => handleDelete(venda.id)}
                        >
                          🗑
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default Sales

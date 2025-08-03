import { useEffect, useState } from 'react'
import axios from 'axios'
import { PencilSimple, TrashSimple } from 'phosphor-react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import SaleForm from '../components/SalesForm'

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
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <main className="ml-60 flex-1 p-8">
          <h2 className="text-3xl font-bold text-purple-800 mb-8 text-center">
            Página de Vendas
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <SaleForm onVendaCriada={fetchVendas} />

            <div className="bg-white p-6 rounded-2xl shadow-md border border-purple-200">
              <h3 className="text-lg font-semibold text-purple-700 mb-4 text-center">
                Todas as Vendas Registradas
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-sm text-gray-700">
                  <thead>
                    <tr className="bg-purple-100 text-purple-800 text-left">
                      <th className="py-3 px-4 rounded-l-md">Código</th>
                      <th className="py-3 px-4">Cliente</th>
                      <th className="py-3 px-4">Itens</th>
                      <th className="py-3 px-4">Valor</th>
                      <th className="py-3 px-4 rounded-r-md">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sales.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="text-center py-6 text-gray-400 italic">
                          Nenhuma venda cadastrada.
                        </td>
                      </tr>
                    ) : (
                      sales.map((venda) => (
                        <tr key={venda.id} className="border-b border-gray-100 hover:bg-purple-50 transition">
                          <td className="px-4 py-3 font-mono text-sm text-gray-600">
                            {venda.id.slice(0, 4)}
                          </td>
                          <td className="px-4 py-3">{venda.clientName}</td>
                          <td className="px-4 py-3">{venda.itemsCount}</td>
                          <td className="px-4 py-3 font-semibold text-purple-600">
                            R$ {venda.total.toFixed(2)}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex gap-3 items-center">
                              <button
                                className="text-blue-600 hover:scale-110 transition"
                                onClick={() => alert('Função de edição ainda não implementada')}
                                title="Editar"
                              >
                                <PencilSimple size={20} weight="bold" />
                              </button>
                              <button
                                className="text-red-500 hover:scale-110 transition"
                                onClick={() => handleDelete(venda.id)}
                                title="Excluir"
                              >
                                <TrashSimple size={20} weight="bold" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default Sales

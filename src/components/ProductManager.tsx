import { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import ProductForm from '../components/ProductForm'
import ProductTable from '../components/ProductTable'
import { API_URL } from '../config/api'

function ProductManager() {
  const [atualizarLista, setAtualizarLista] = useState(false)
  const [categorias, setCategorias] = useState([])
  const [busca, setBusca] = useState('') // ⭐ Estado para busca

  const refreshList = () => setAtualizarLista(prev => !prev)

  useEffect(() => {
    axios.get(`${API_URL}/categories`)
      .then(response => setCategorias(response.data))
      .catch(() => setCategorias([]))
  }, [])

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />

        <main className="ml-60 flex-1 p-6">
          <h2 className="text-2xl font-bold text-purple-800 mb-1">
            Produtos e categorias
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Atualmente há <span className="text-purple-800 font-semibold">3 produtos</span> cadastrados e disponíveis
          </p>

          <div className="mb-4">
            <input
              type="text"
              placeholder="🔍 Pesquisar produto por nome..."
              className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 bg-white p-6 rounded-xl shadow-md">
              <ProductTable key={atualizarLista.toString()} busca={busca} /> {/* Passa prop */}
            </div>

            <div className="col-span-1 space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <ProductForm onProductAdded={refreshList} categorias={categorias} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default ProductManager

import { useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import ProductForm from '../components/ProductForm'
import ProductTable from '../components/ProductTable'

function ProductManager() {
  const [atualizarLista, setAtualizarLista] = useState(false)

  const refreshList = () => {
    setAtualizarLista(prev => !prev)
  }

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
            Atualmente há <span className="text-orange-500 font-semibold">3 produtos</span> cadastrados e disponíveis
          </p>

          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 bg-white p-6 rounded-xl shadow-md">
              <ProductTable key={atualizarLista.toString()} />
            </div>

            <div className="col-span-1 space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <ProductForm onProductAdded={refreshList} categorias={[]} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default ProductManager

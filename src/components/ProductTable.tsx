import { useEffect, useState } from 'react'
import { getProducts, deleteProduct } from '../services/productService'

interface Produto {
  id: string
  name: string
  price: number
  quantity: number
  category: { id: string; name: string }
}

function ProductTable() {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [busca, setBusca] = useState('')
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('')

  const fetchProdutos = async () => {
    try {
      const data = await getProducts()
      setProdutos(data)
    } catch (error) {
      console.error('Erro ao buscar produtos', error)
    }
  }

  useEffect(() => {
    fetchProdutos()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Deseja realmente deletar este produto?')) return
    try {
      await deleteProduct(id)
      fetchProdutos()
    } catch (error) {
      alert('Erro ao deletar produto')
    }
  }

  const categorias = Array.from(new Set(produtos.map(p => p.category.name)))

  const produtosFiltrados = produtos.filter(prod => {
    const nomeMatch = prod.name.toLowerCase().includes(busca.toLowerCase())
    const categoriaMatch = categoriaSelecionada === '' || prod.category.name === categoriaSelecionada
    return nomeMatch && categoriaMatch
  })

  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold text-purple-800 mb-4">Lista de Produtos</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Pesquisar por nome"
          className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={busca}
          onChange={e => setBusca(e.target.value)}
        />
        <select
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={categoriaSelecionada}
          onChange={e => setCategoriaSelecionada(e.target.value)}
        >
          <option value="">Todas categorias</option>
          {categorias.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <table className="w-full text-sm text-gray-700">
        <thead>
          <tr className="text-purple-600 border-b">
            <th className="py-2 text-left">id/nome</th>
            <th className="py-2 text-left">categoria</th>
            <th className="py-2 text-left">disponíveis</th>
            <th className="py-2 text-left">valor</th>
            <th className="py-2 text-left">ações</th>
          </tr>
        </thead>
        <tbody>
          {produtosFiltrados.map(prod => (
            <tr key={prod.id} className="border-b hover:bg-purple-50">
              <td className="py-2">{prod.id}/{prod.name}</td>
              <td>{prod.category.name}</td>
              <td>{prod.quantity}</td>
              <td>R${prod.price}</td>
              <td>
                <button className="text-purple-600 hover:text-purple-800 mr-2">✏️</button>
                <button
                  onClick={() => handleDelete(prod.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  🗑
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ProductTable

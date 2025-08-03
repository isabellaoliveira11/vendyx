import { useEffect, useState } from 'react'
import { Trash, SpinnerGap } from 'phosphor-react'
import { getProducts, deleteProduct } from '../services/productService'

interface Produto {
  id: string
  name: string
  price: number
  stock: number // atualizado conforme seu backend
  categoryName: string
}

interface ProductTableProps {
  busca: string
}

function ProductTable({ busca }: ProductTableProps) {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [loading, setLoading] = useState(false)

  const buscarProdutos = async () => {
    setLoading(true)
    try {
      const data = await getProducts()
      setProdutos(data)
    } catch (err) {
      console.error('Erro ao buscar produtos:', err)
    } finally {
      setLoading(false)
    }
  }

  const removerProduto = async (id: string) => {
    if (!window.confirm('Deseja remover este produto?')) return
    try {
      await deleteProduct(id)
      setProdutos((prev) => prev.filter((p) => p.id !== id))
    } catch {
      alert('Erro ao remover produto')
    }
  }

  useEffect(() => {
    buscarProdutos()
  }, [])

  const produtosFiltrados = produtos.filter((prod) =>
    prod.name.toLowerCase().includes(busca.toLowerCase())
  )

  const formatarMoeda = (valor: number) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor)

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
      {loading ? (
        <div className="flex justify-center items-center h-40 text-gray-500">
          <SpinnerGap className="animate-spin" size={28} />
          <span className="ml-3 text-lg">Carregando produtos...</span>
        </div>
      ) : (
        <>
          <div className="p-4 text-sm text-gray-600">
            Atualmente há{' '}
            <span className="font-bold text-purple-600">
              {produtos.length}
            </span>{' '}
            {produtos.length === 1 ? 'produto' : 'produtos'} cadastrados e disponíveis.
          </div>

          <table className="w-full text-sm text-gray-700 divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr className="text-left text-purple-700 uppercase text-xs font-semibold tracking-wide">
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Nome</th>
                <th className="py-3 px-4">Preço</th>
                <th className="py-3 px-4">Estoque</th>
                <th className="py-3 px-4">Categoria</th>
                <th className="py-3 px-4">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {produtosFiltrados.map((prod, index) => (
                <tr key={prod.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{prod.name}</td>
                  <td className="py-3 px-4">{formatarMoeda(prod.price)}</td>
                  <td className="py-3 px-4">{prod.stock}</td>
                  <td className="py-3 px-4">{prod.categoryName}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => removerProduto(prod.id)}
                      className="text-red-500 hover:text-red-700 transition"
                      title="Remover"
                    >
                      <Trash size={20} />
                    </button>
                  </td>
                </tr>
              ))}

              {produtosFiltrados.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-6 text-gray-500 italic"
                  >
                    Nenhum produto encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  )
}

export default ProductTable

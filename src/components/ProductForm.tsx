import { useState } from 'react'
import { createProduct } from '../services/productService'

interface ProductFormProps {
  categorias: { id: string; name: string }[]
  onProductAdded: () => void
}

function ProductForm({ categorias, onProductAdded }: ProductFormProps) {
  const [nome, setNome] = useState('')
  const [preco, setPreco] = useState('')
  const [quantidade, setQuantidade] = useState('')
  const [categoria, setCategoria] = useState('')

  const adicionarProduto = async () => {
    if (!nome || !preco || !quantidade || !categoria) {
      alert('Preencha todos os campos')
      return
    }

    try {
      await createProduct({
        name: nome,
        price: Number(preco),
        quantity: Number(quantidade),
        categoryId: categoria,
      })
      alert('Produto adicionado com sucesso!')
      setNome('')
      setPreco('')
      setQuantidade('')
      setCategoria('')
      onProductAdded()
    } catch (error) {
      console.error('Erro ao adicionar produto', error)
      alert('Erro ao adicionar produto')
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <h3 className="text-lg font-semibold text-purple-800 mb-4">Adicionar Novo Produto</h3>

      <div className="grid gap-3">
        <input
          type="text"
          placeholder="Digite o nome"
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="number"
          placeholder="Digite o valor"
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
        />
        <input
          type="number"
          placeholder="Digite a quantidade"
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
        />
        <select
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        >
          <option value="">Selecione a categoria</option>
          {categorias.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>

        <button
          onClick={adicionarProduto}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded-md transition"
        >
          + Novo Produto
        </button>
      </div>
    </div>
  )
}

export default ProductForm

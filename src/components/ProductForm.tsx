import { useState } from 'react'
import { createProduct } from '../services/productService.ts'

interface ProductFormProps {
  categorias: { id: string; name: string }[]
  onProductAdded: () => void
}

function ProductForm({ categorias, onProductAdded }: ProductFormProps) {
  const [nome, setNome] = useState('')
  const [precoRaw, setPrecoRaw] = useState('')
  const [quantidade, setQuantidade] = useState('')
  const [categoria, setCategoria] = useState('')

  const formatarParaReal = (valor: string) => {
    const numero = parseFloat(valor || '0') / 100
    return numero.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
  }

  const adicionarProduto = async () => {
    if (!nome || !precoRaw || !quantidade || !categoria) {
      console.error('Preencha todos os campos')
      return
    }

    try {
      await createProduct({
        name: nome,
        price: Number(precoRaw) / 100,
        stock: Number(quantidade),
        categoryId: categoria,
      })

      console.log('Produto adicionado com sucesso!')
      setNome('')
      setPrecoRaw('')
      setQuantidade('')
      setCategoria('')
      onProductAdded()
    } catch (error) {
      console.error('Erro ao adicionar produto', error)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-5 border border-gray-100">
      <h3 className="text-xl font-bold text-purple-700">Novo Produto</h3>

      <div className="grid gap-4">
        <input
          type="text"
          placeholder="Nome do produto"
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <input
          type="text"
          placeholder="Preço (R$)"
          inputMode="numeric"
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={formatarParaReal(precoRaw)}
          onChange={(e) => {
            const valorSomenteNumeros = e.target.value.replace(/\D/g, '')
            setPrecoRaw(valorSomenteNumeros)
          }}
        />

        <input
          type="number"
          placeholder="Estoque"
          min={0}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
        />

        {/* Combobox estilizada */}
        <div className="relative">
          <select
            className="appearance-none w-full border border-gray-300 text-gray-700 bg-white rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option disabled value="">
              🛒 Selecione uma categoria
            </option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-purple-500">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        <button
          onClick={adicionarProduto}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded-lg transition shadow-md"
        >
          + Adicionar Produto
        </button>
      </div>
    </div>
  )
}

export default ProductForm

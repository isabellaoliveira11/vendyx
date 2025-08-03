import { useState, Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { createProduct } from '../services/productService.ts'

interface ProductFormProps {
  categorias: { id: string; name: string }[]
  onProductAdded: () => void
}

function ProductForm({ categorias, onProductAdded }: ProductFormProps) {
  const [nome, setNome] = useState('')
  const [precoRaw, setPrecoRaw] = useState('')
  const [quantidade, setQuantidade] = useState('')
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<{ id: string; name: string } | null>(null)

  const formatarParaReal = (valor: string) => {
    const numero = parseFloat(valor || '0') / 100
    return numero.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
  }

  const adicionarProduto = async () => {
    if (!nome || !precoRaw || !quantidade || !categoriaSelecionada) {
      console.error('Preencha todos os campos')
      return
    }

    try {
      await createProduct({
        name: nome,
        price: Number(precoRaw) / 100,
        stock: Number(quantidade),
        categoryId: categoriaSelecionada.id,
      })

      setNome('')
      setPrecoRaw('')
      setQuantidade('')
      setCategoriaSelecionada(null)
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

        {/* Combobox com Headless UI */}
        <div className="w-full">
          <Listbox value={categoriaSelecionada} onChange={setCategoriaSelecionada}>
            <div className="relative">
              <Listbox.Button className="relative w-full cursor-pointer rounded-lg border border-gray-300 bg-white py-2 pl-4 pr-10 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
                <span className="block truncate">
                  {categoriaSelecionada ? categoriaSelecionada.name : '🛒 Selecione uma categoria'}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <ChevronUpDownIcon className="h-5 w-5 text-purple-500" />
                </span>
              </Listbox.Button>

              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {categorias.map((cat) => (
                    <Listbox.Option
                      key={cat.id}
                      value={cat}
                      className={({ active }) =>
                        `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                          active ? 'bg-purple-100 text-purple-900' : 'text-gray-900'
                        }`
                      }
                    >
                      {({ selected }) => (
                        <>
                          <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>
                            {cat.name}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-600">
                              <CheckIcon className="h-5 w-5" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
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

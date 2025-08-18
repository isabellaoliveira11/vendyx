import { useEffect, useState, Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import {
  PlusCircle,
  PencilSimple,
  Check,
  CaretDown,
  CurrencyDollar,
  Package,
} from 'phosphor-react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { API_URL } from '../config/api';

interface Category {
  id: string;
  name: string;
}
interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  categoryId: string;
  category?: Category;
}
interface ProductFormProps {
  categories: Category[];
  onProductAction: () => void;
  editingProduct: Product | null;
  onCancelEdit: () => void;
}

function ProductForm({ categories, onProductAction, editingProduct, onCancelEdit }: ProductFormProps) {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState<number | ''>('');
  const [productStock, setProductStock] = useState<number | ''>('');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const [nameError, setNameError] = useState<string | null>(null);
  const [priceError, setPriceError] = useState<string | null>(null);
  const [stockError, setStockError] = useState<string | null>(null);
  const [categoryError, setCategoryError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Preenche/limpa quando muda o produto em edição
  useEffect(() => {
    if (editingProduct) {
      setProductName(editingProduct.name);
      setProductPrice(editingProduct.price);
      setProductStock(editingProduct.stock);
      const category = categories.find(cat => cat.id === editingProduct.categoryId) || null;
      setSelectedCategory(category);
      setNameError(null); setPriceError(null); setStockError(null); setCategoryError(null);
    } else {
      resetForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editingProduct, categories]);

  const resetForm = () => {
    setProductName('');
    setProductPrice('');
    setProductStock('');
    setSelectedCategory(null);
    setNameError(null);
    setPriceError(null);
    setStockError(null);
    setCategoryError(null);
  };

  const validateForm = () => {
    let ok = true;
    if (!productName.trim()) { setNameError('Nome do produto é obrigatório.'); ok = false; } else setNameError(null);
    if (productPrice === '' || isNaN(Number(productPrice)) || Number(productPrice) <= 0) {
      setPriceError('Preço deve ser um número válido > 0.'); ok = false;
    } else setPriceError(null);
    if (productStock === '' || isNaN(Number(productStock)) || Number(productStock) < 0) {
      setStockError('Estoque deve ser um número ≥ 0.'); ok = false;
    } else setStockError(null);
    if (!selectedCategory) { setCategoryError('Selecione uma categoria.'); ok = false; } else setCategoryError(null);
    return ok;
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!validateForm()) {
      toast.error('Preencha todos os campos corretamente.');
      return;
    }
    setIsLoading(true);
    const payload = {
      name: productName.trim(),
      price: Number(productPrice),
      stock: Number(productStock),
      categoryId: selectedCategory!.id,
    };
    try {
      if (editingProduct) {
        await toast.promise(
          axios.put(`${API_URL}/products/${editingProduct.id}`, payload),
          { loading: 'Salvando alterações...', success: 'Produto atualizado!', error: 'Erro ao atualizar.' }
        );
      } else {
        await toast.promise(
          axios.post(`${API_URL}/products`, payload),
          { loading: 'Adicionando produto...', success: 'Produto adicionado!', error: 'Erro ao adicionar.' }
        );
      }
      onProductAction();
      onCancelEdit();
      resetForm();
    } catch (err) {
      console.error('Erro ao salvar produto:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h3 className="text-lg font-semibold text-purple-700 mb-4 flex items-center gap-2">
        {editingProduct ? <PencilSimple size={20} weight="bold" /> : <PlusCircle size={20} weight="bold" />}
        {editingProduct ? 'Editar Produto' : 'Novo Produto'}
      </h3>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Nome (span 2 no desktop) */}
        <div className="md:col-span-2">
          <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-1">Nome do produto</label>
          <input
            id="productName"
            type="text"
            autoComplete="off"
            className={`border rounded-md p-2 w-full ${nameError ? 'border-red-500' : 'border-gray-300'} focus:border-purple-500 focus:ring-purple-200 focus:ring-2 transition-colors`}
            placeholder="Ex.: Camiseta VendyX"
            value={productName}
            onChange={(e) => { setProductName(e.target.value); setNameError(null); }}
            aria-invalid={!!nameError}
          />
          {nameError && <p className="text-red-500 text-xs mt-1">{nameError}</p>}
        </div>

        {/* Preço */}
        <div>
          <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700 mb-1">Preço (R$)</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              <CurrencyDollar size={18} />
            </span>
            <input
              id="productPrice"
              type="number"
              inputMode="decimal"
              step="0.01"
              min="0"
              className={`pl-10 border rounded-md p-2 w-full ${priceError ? 'border-red-500' : 'border-gray-300'} focus:border-purple-500 focus:ring-purple-200 focus:ring-2 transition-colors`}
              placeholder="0,00"
              value={productPrice}
              onChange={(e) => { setProductPrice(e.target.value === '' ? '' : Number(e.target.value)); setPriceError(null); }}
              aria-invalid={!!priceError}
              autoComplete="off"
            />
          </div>
          {priceError && <p className="text-red-500 text-xs mt-1">{priceError}</p>}
        </div>

        {/* Estoque */}
        <div>
          <label htmlFor="productStock" className="block text-sm font-medium text-gray-700 mb-1">Estoque</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              <Package size={18} />
            </span>
            <input
              id="productStock"
              type="number"
              inputMode="numeric"
              step="1"
              min="0"
              className={`pl-10 border rounded-md p-2 w-full ${stockError ? 'border-red-500' : 'border-gray-300'} focus:border-purple-500 focus:ring-2 transition-colors`}
              placeholder="0"
              value={productStock}
              onChange={(e) => { setProductStock(e.target.value === '' ? '' : Number(e.target.value)); setStockError(null); }}
              aria-invalid={!!stockError}
              autoComplete="off"
            />
          </div>
          {stockError && <p className="text-red-500 text-xs mt-1">{stockError}</p>}
        </div>

        {/* Categoria (span 2 no desktop) */}
        <div className="md:col-span-2">
          <label htmlFor="productCategory" className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
          <Listbox value={selectedCategory} onChange={(value) => { setSelectedCategory(value); setCategoryError(null); }}>
            <div className="relative">
              <Listbox.Button
                className={`relative w-full cursor-pointer rounded-md border ${categoryError ? 'border-red-500' : 'border-gray-300'} bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 sm:text-sm`}
                aria-invalid={!!categoryError}
              >
                <span className="block truncate">{selectedCategory ? selectedCategory.name : 'Selecione uma categoria'}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <CaretDown size={16} className="text-gray-400" aria-hidden="true" />
                </span>
              </Listbox.Button>
              <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {categories.length > 0 ? (
                    categories.map((category) => (
                      <Listbox.Option
                        key={category.id}
                        className={({ active }) => `relative cursor-pointer select-none py-2 pl-3 pr-9 ${active ? 'bg-purple-100 text-purple-900' : 'text-gray-900'}`}
                        value={category}
                      >
                        {({ selected }) => (
                          <>
                            <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>{category.name}</span>
                            {selected ? (
                              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-purple-600">
                                <Check size={16} aria-hidden="true" />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))
                  ) : (
                    <div className="px-3 py-2 text-gray-500">Nenhuma categoria encontrada.</div>
                  )}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
          {categoryError && <p className="text-red-500 text-xs mt-1">{categoryError}</p>}
        </div>

        {/* Ações */}
        <div className="md:col-span-2 flex flex-col sm:flex-row gap-2 sm:gap-3 mt-2">
          <button
            type="submit"
            className="w-full sm:w-auto justify-center bg-purple-600 text-white px-5 py-2.5 rounded-lg shadow-md hover:bg-purple-700 transition duration-300 ease-in-out flex items-center gap-2 text-sm font-semibold disabled:opacity-60"
            disabled={isLoading}
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : editingProduct ? (
              <>
                <PencilSimple size={20} weight="bold" /> Salvar Alterações
              </>
            ) : (
              <>
                <PlusCircle size={20} weight="bold" /> Adicionar Produto
              </>
            )}
          </button>

          {editingProduct && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="w-full sm:w-auto justify-center bg-gray-200 text-gray-800 px-5 py-2.5 rounded-lg shadow-md hover:bg-gray-300 transition duration-300 ease-in-out flex items-center gap-2 text-sm font-semibold disabled:opacity-60"
              disabled={isLoading}
            >
              Cancelar Edição
            </button>
          )}
        </div>
      </form>
    </>
  );
}

export default ProductForm;

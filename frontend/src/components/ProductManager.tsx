import { useEffect, useState } from 'react';
import axios from 'axios';
import { Package, MagnifyingGlass, X } from 'phosphor-react';
import toast from 'react-hot-toast';

import { API_URL } from '../config/api';
import ProductForm from '../components/ProductForm';
import ProductTable from '../components/ProductTable';

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  categoryId: string;
  category?: { id: string; name: string };
}
interface Category { id: string; name: string }

function ProductManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  const fetchProductsAndCategories = async () => {
    setLoading(true);
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        axios.get(`${API_URL}/products`),
        axios.get(`${API_URL}/categories`)
      ]);
      setProducts(productsRes.data);
      setCategories(categoriesRes.data);
    } catch (err) {
      console.error('Erro ao buscar dados', err);
      toast.error('Erro ao carregar produtos ou categorias.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductsAndCategories();
  }, []);

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (product: Product) => setEditingProduct(product);
  const handleCancelEdit = () => setEditingProduct(null);

  const handleDeleteClick = (id: string) => {
    setProductToDelete(id);
    setShowConfirmModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;
    try {
      await toast.promise(
        axios.delete(`${API_URL}/products/${productToDelete}`),
        { loading: 'Excluindo produto...', success: 'Produto excluído com sucesso!', error: 'Erro ao excluir produto.' }
      );
      setProducts(prev => prev.filter(prod => prod.id !== productToDelete));
      if (editingProduct?.id === productToDelete) setEditingProduct(null);
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
      toast.error('Erro ao excluir produto.');
    } finally {
      setShowConfirmModal(false);
      setProductToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setShowConfirmModal(false);
    setProductToDelete(null);
  };

  return (
    <>
      <div className="p-4 sm:p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-1">
          <Package size={32} className="text-purple-700" weight="duotone" />
          <h2 className="text-2xl font-bold text-gray-800">Produtos</h2>
        </div>
        <p className="text-sm text-gray-600 mb-6 -mt-1">
          Atualmente há <span className="text-purple-700 font-semibold">{products.length} produtos</span> cadastrados e em estoque.
        </p>

        {/* Grid principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lista + busca (2 col no desktop) */}
          <section className="lg:col-span-2 order-2 lg:order-1">
            {/* Busca (sticky no desktop) */}
            <div className="bg-white p-3 sm:p-4 rounded-xl shadow-md border border-purple-100 flex items-center gap-2 mb-4 lg:sticky lg:top-20">
              <MagnifyingGlass size={20} className="text-gray-400" />
              <input
                type="text"
                placeholder="Pesquisar produto por nome..."
                className="flex-1 py-1 outline-none border-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="text-gray-400 hover:text-gray-600 transition"
                  aria-label="Limpar busca"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            {/* Tabela (ProductTable já trata responsividade e scroll) */}
            <ProductTable
              products={filteredProducts}
              loading={loading}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
            />
          </section>

          {/* Formulário (vai pra direita no desktop, fica acima no mobile) */}
          <aside className="order-1 lg:order-2">
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md border border-purple-100">
              <ProductForm
                categories={categories}
                onProductAction={fetchProductsAndCategories}
                editingProduct={editingProduct}
                onCancelEdit={handleCancelEdit}
              />
            </div>
          </aside>
        </div>
      </div>

      {/* Modal de confirmação */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white p-6 rounded-xl shadow-2xl max-w-sm w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-bold text-gray-800">Confirmar Exclusão</h4>
              <button onClick={handleDeleteCancel} className="text-gray-400 hover:text-gray-600" aria-label="Fechar modal">
                <X size={20} />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-6">
              Tem certeza que deseja excluir este produto? Esta ação é irreversível.
            </p>
            <div className="flex flex-col sm:flex-row justify-end gap-3">
              <button
                onClick={handleDeleteCancel}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductManager;

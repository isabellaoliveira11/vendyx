import { useEffect, useState } from 'react';
import axios from 'axios';
import { Package, MagnifyingGlass } from 'phosphor-react';
import toast from 'react-hot-toast';

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import ProductForm from '../components/ProductForm';
import ProductTable from '../components/ProductTable';
import { API_URL } from '../config/api';

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  categoryId: string;
  category?: {
    id: string;
    name: string;
  };
}

interface Category {
  id: string;
  name: string;
}

function ProductManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

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

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  // Função para deletar produto e atualizar lista local
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm('Tem certeza que deseja excluir este produto? Esta ação é irreversível.');
    if (!confirmDelete) return;

    try {
      await toast.promise(
        axios.delete(`${API_URL}/products/${id}`),
        {
          loading: 'Excluindo produto...',
          success: 'Produto excluído com sucesso!',
          error: 'Erro ao excluir produto.',
        }
      );
      setProducts(prev => prev.filter(prod => prod.id !== id));
      // Se o produto que estava editando foi deletado, limpa o form
      if (editingProduct?.id === id) {
        setEditingProduct(null);
      }
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
      toast.error('Erro ao excluir produto.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />

        <main className="flex-1 p-6">
          <div className="flex items-center gap-3 mb-1">
            <Package size={32} className="text-purple-700" weight="duotone" />
            <h2 className="text-2xl font-bold text-gray-800">Produtos</h2>
          </div>
          <p className="text-sm text-gray-600 mb-6 -mt-1">
            Atualmente há <span className="text-purple-700 font-semibold">{products.length} produtos</span> cadastrados e em estoque.
          </p>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="col-span-2">
              <div className="bg-white p-4 rounded-xl shadow-md border border-purple-100 flex items-center gap-2 mb-4">
                <MagnifyingGlass size={20} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Pesquisar produto por nome..."
                  className="flex-1 p-1 outline-none focus:ring-0 border-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <ProductTable
                products={filteredProducts}
                loading={loading}
                onEdit={handleEdit}
                onDelete={handleDelete}  // <-- Passa aqui a função
              />
            </div>

            <div className="col-span-1">
              <div className="bg-white p-6 rounded-xl shadow-md border border-purple-100">
                <ProductForm
                  categories={categories}
                  onProductAction={fetchProductsAndCategories}
                  editingProduct={editingProduct}
                  onCancelEdit={handleCancelEdit}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default ProductManager;

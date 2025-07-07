import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import ProductForm from './ProductForm';
import CategoryManager from './CategoryManager';
import { ProductTable } from '../components/ProductTable';

function ProductManager() {
  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />

        <main className="ml-60 flex-1 p-6">
          {/* Título da página */}
          <h2 className="text-2xl font-bold text-purple-800 mb-1">
            Produtos e categorias
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Atualmente há <span className="text-orange-500 font-semibold">3 produtos</span> cadastrados e disponíveis
          </p>

          {/* Grid geral */}
          <div className="grid grid-cols-3 gap-6">
            {/* COLUNA ESQUERDA: Lista de produtos */}
            <div className="col-span-2 bg-white p-6 rounded-xl shadow-md">
              <ProductTable />
            </div>

            {/* COLUNA DIREITA: Adicionar produto e categorias */}
            <div className="col-span-1 space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <ProductForm />
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <CategoryManager />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default ProductManager;

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import ProductForm from './ProductForm';
import CategoryManager from './CategoryManager';
import { ProductTable } from '../components/ProductTable'; // ✅ CERTO

function ProductManager() {
  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />

        <main className="ml-60 flex-1 p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Produtos e categorias
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            atualmente há <span className="font-semibold text-orange-500">3 produtos</span> cadastrados e disponíveis
          </p>

          <div className="grid grid-cols-3 gap-6">
            {/* COLUNA ESQUERDA: Tabela de Produtos (2/3 da tela) */}
            <div className="col-span-2">
              <ProductTable />
            </div>

            {/* COLUNA DIREITA: Formulário e categorias (1/3 da tela) */}
            <div className="col-span-1 space-y-6">
              <ProductForm />
              <CategoryManager />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default ProductManager;

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import useWindowSize from '../hooks/useWindowSize';

function Products() {
  const { windowWidth } = useWindowSize();

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-purple-50">
        <Sidebar />
        <main className="flex-1 p-6">
          <h2 className="text-2xl font-bold text-purple-800">
            {windowWidth < 768 ? '📦 Produtos (Mobile)' : '📦 Gestão de Produtos'}
          </h2>
          <p className="text-sm text-purple-600 mt-2">
            Aqui você poderá visualizar, adicionar e editar seus produtos.
          </p>

          {/* Conteúdo futuro vem aqui */}
          <div className="mt-10 bg-white p-4 rounded shadow text-purple-700">
            Lista de produtos em breve...
          </div>
        </main>
      </div>
    </>
  );
}

export default Products;

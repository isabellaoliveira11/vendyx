import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import CategoryManager from '../components/CategoryManager';

function Categorias() {
  return (
    <>
      <Navbar />
      <div className="flex bg-gray-50 min-h-screen">
        <Sidebar />
        <main className="flex-1 p-6">
          <CategoryManager />
        </main>
      </div>
    </>
  );
}

export default Categorias;

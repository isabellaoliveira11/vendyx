// src/pages/Categorias.tsx
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import CategoryManager from '../components/CategoryManager';

function Categorias() {
  return (
    <>
      <Navbar />
      <div className="flex bg-gray-100 min-h-screen">
        <Sidebar />
        <main className="flex-1 ml-64 px-6 py-6">
          <div className="max-w-4xl">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-2xl font-bold text-purple-700 mb-6">Categorias</h2>
              <CategoryManager />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Categorias;

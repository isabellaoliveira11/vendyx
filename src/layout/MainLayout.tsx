
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

function MainLayout() {
  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-60 p-6">
        {/* A tag <Outlet /> é um placeholder. O React Router vai renderizar a página da rota atual aqui dentro. */}
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
import { Link } from 'react-router-dom';
import {
  FaHome,
  FaBox,
  FaShoppingCart,
  FaChartBar,
  FaUsers,
  FaInfoCircle,
  FaSync,
} from 'react-icons/fa';

function Sidebar() {
  return (
    <div className="h-screen w-60 bg-purple-500 text-white flex flex-col justify-between fixed left-0 top-0 z-50">
      <div>
        <div className="flex items-center justify-center py-6 text-2xl font-bold border-b border-white/20">
          <FaSync className="mr-2 animate-spin" />
          Vendyx
        </div>
        <nav className="flex flex-col gap-4 mt-8 px-6">
          <Link to="/home" className="flex items-center gap-2 hover:text-gray-100">
            <FaHome /> Home
          </Link>
          <Link to="/produtos" className="flex items-center gap-2 hover:text-gray-100">
            <FaBox /> Produtos
          </Link>
          <Link to="/vendas" className="flex items-center gap-2 hover:text-gray-100">
            <FaShoppingCart /> Vendas
          </Link>
          <Link to="/relatorios" className="flex items-center gap-2 hover:text-gray-100">
            <FaChartBar /> Relatórios
          </Link>
          <Link to="/usuarios" className="flex items-center gap-2 hover:text-gray-100">
            <FaUsers /> Usuários
          </Link>
          <Link to="/sobre" className="flex items-center gap-2 hover:text-gray-100">
            <FaInfoCircle /> Sobre
          </Link>
        </nav>
      </div>
      <div className="text-center text-sm py-4 border-t border-white/20">
        Isabela Oliveira<br />
        <span className="text-xs">(ADMIN)</span>
      </div>
    </div>
  );
}

export default Sidebar;

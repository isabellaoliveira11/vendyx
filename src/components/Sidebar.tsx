import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import {
  FaHome,
  FaBox,
  FaShoppingCart,
  FaChartBar,
  FaUsers,
  FaInfoCircle,
  FaSync,
  FaChevronDown,
  FaChevronUp,
  FaUserTag,
  FaDollarSign, // 1. Ícone adicionado
} from 'react-icons/fa';

function Sidebar() {
  const location = useLocation();
  const [isProductsOpen, setIsProductsOpen] = useState(
    location.pathname.includes('/produtos') || location.pathname.includes('/categorias')
  );

  const toggleProductsMenu = () => setIsProductsOpen((prev) => !prev);

  // 2. Novo item "Financeiro" adicionado à lista
  const navItems = [
    { to: '/vendas', icon: <FaShoppingCart />, label: 'Vendas' },
    { to: '/clientes', icon: <FaUserTag />, label: 'Clientes' },
    { to: '/relatorios', icon: <FaChartBar />, label: 'Relatórios' },
    { to: '/financeiro', icon: <FaDollarSign />, label: 'Financeiro' },
    { to: '/usuarios', icon: <FaUsers />, label: 'Usuários' },
    { to: '/sobre', icon: <FaInfoCircle />, label: 'Sobre' },
  ];

  return (
    <div className="h-screen w-60 bg-purple-700 text-white flex flex-col justify-between fixed left-0 top-0 z-50 shadow-lg">
      <div>
        <div className="flex items-center justify-center py-7 text-3xl font-bold border-b border-white/10">
          <FaSync className="mr-3 animate-spin" />
          VendyX
        </div>

        <nav className="flex flex-col gap-3 mt-10 px-4">
          {/* Item Home */}
          <Link
            to="/home"
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
              location.pathname === '/home'
                ? 'bg-purple-800 font-semibold text-white shadow-md'
                : 'hover:bg-purple-600 text-white/90'
            }`}
          >
            <FaHome /> Home
          </Link>

          {/* Item com submenu (Produtos) */}
          <div>
            <button
              onClick={toggleProductsMenu}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-left font-medium transition-all duration-200 ${
                location.pathname.includes('/produtos') || location.pathname.includes('/categorias')
                  ? 'bg-purple-800 text-white shadow-md'
                  : 'hover:bg-purple-600 text-white/90'
              }`}
            >
              <span className="flex items-center gap-3">
                <FaBox /> Produtos
              </span>
              {isProductsOpen ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
            </button>

            {/* Submenu de Produtos */}
            {isProductsOpen && (
              <div className="ml-6 mt-2 flex flex-col gap-2 text-sm">
                <Link
                  to="/produtos"
                  className={`pl-2 py-1 rounded-md transition ${
                    location.pathname === '/produtos' ? 'bg-purple-600 text-white' : 'hover:bg-purple-500 text-white/90'
                  }`}
                >
                  Gerenciar Produtos
                </Link>
                <Link
                  to="/categorias"
                  className={`pl-2 py-1 rounded-md transition ${
                    location.pathname === '/categorias' ? 'bg-purple-600 text-white' : 'hover:bg-purple-500 text-white/90'
                  }`}
                >
                  Categorias
                </Link>
              </div>
            )}
          </div>

          {/* Resto dos itens mapeados da lista */}
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
                location.pathname === item.to
                  ? 'bg-purple-800 font-semibold text-white shadow-md'
                  : 'hover:bg-purple-600 text-white/90'
              }`}
            >
              {item.icon} {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="text-center text-sm py-5 border-t border-white/10">
        Isabela Oliveira
        <br />
        <span className="text-xs opacity-80">(ADMIN)</span>
      </div>
    </div>
  );
}

export default Sidebar;

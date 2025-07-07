import { Link, useLocation } from 'react-router-dom';
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
  const location = useLocation();

  const navItems = [
    { to: '/home', icon: <FaHome />, label: 'Home' },
    { to: '/produtos', icon: <FaBox />, label: 'Produtos' },
    { to: '/vendas', icon: <FaShoppingCart />, label: 'Vendas' },
    { to: '/relatorios', icon: <FaChartBar />, label: 'Relatórios' },
    { to: '/usuarios', icon: <FaUsers />, label: 'Usuários' },
    { to: '/sobre', icon: <FaInfoCircle />, label: 'Sobre' },
  ];

  return (
    <div className="h-screen w-60 bg-purple-500 text-white flex flex-col justify-between fixed left-0 top-0 z-50">
      <div>
        <div className="flex items-center justify-center py-6 text-2xl font-bold border-b border-white/20">
          <FaSync className="mr-2 animate-spin" />
          Vendyx
        </div>

        <nav className="flex flex-col gap-2 mt-8 px-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-2 px-3 py-2 rounded transition-all ${
                  isActive
                    ? 'bg-white/20 font-semibold text-white'
                    : 'hover:bg-white/10 text-white/80'
                }`}
              >
                {item.icon} {item.label}
              </Link>
            );
          })}
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

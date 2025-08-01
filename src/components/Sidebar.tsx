import { Link, useLocation } from 'react-router-dom';
import {
  FaHome,
  FaBox,
  FaShoppingCart,
  FaChartBar,
  FaUsers,
  FaInfoCircle,
  FaSync, // Mantido, se quiser a animação
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
    // Ajustado para bg-purple-700 para um tom mais escuro e "premium"
    <div className="h-screen w-60 bg-purple-700 text-white flex flex-col justify-between fixed left-0 top-0 z-50 shadow-lg"> {/* Adicionado shadow-lg */}
      <div>
        {/* Padding vertical ajustado para py-7 para um pouco mais de respiro */}
        <div className="flex items-center justify-center py-7 text-3xl font-bold border-b border-white/10"> {/* text-3xl e border-white/10 para borda mais sutil */}
          <FaSync className="mr-3 animate-spin" /> {/* mr-3 para mais espaço */}
          VendyX
        </div>

        {/* mt-10 para mais espaço entre o logo e o menu, gap-3 para espaço entre os itens */}
        <nav className="flex flex-col gap-3 mt-10 px-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200
                  ${isActive
                    ? 'bg-purple-800 font-semibold text-white shadow-md' // Cor mais escura para ativo, font-semibold
                    : 'hover:bg-purple-600 text-white/90' // Hover na cor da sidebar, texto um pouco mais branco
                  }`}
              >
                {item.icon} {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Ajustado para um padding py-5 e border-white/10 */}
      <div className="text-center text-sm py-5 border-t border-white/10">
        Isabela Oliveira<br />
        <span className="text-xs opacity-80">(ADMIN)</span> {/* opacity-80 para o texto da função */}
      </div>
    </div>
  );
}

export default Sidebar;
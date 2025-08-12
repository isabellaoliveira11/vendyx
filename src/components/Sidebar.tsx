import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
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
  FaDollarSign,
} from "react-icons/fa";

type SidebarProps = {
  onLinkClick?: () => void; // usado pelo drawer mobile
};

export default function Sidebar({ onLinkClick }: SidebarProps) {
  const location = useLocation();

  const [isProductsOpen, setIsProductsOpen] = useState(
    location.pathname.includes("/produtos") || location.pathname.includes("/categorias")
  );

  const toggleProductsMenu = () => setIsProductsOpen((prev) => !prev);

  const navItems = [
    { to: "/vendas", icon: <FaShoppingCart />, label: "Vendas" },
    { to: "/clientes", icon: <FaUserTag />, label: "Clientes" },
    { to: "/relatorios", icon: <FaChartBar />, label: "Relatórios" },
    { to: "/financeiro", icon: <FaDollarSign />, label: "Financeiro" },
    { to: "/usuarios", icon: <FaUsers />, label: "Usuários" },
    { to: "/sobre", icon: <FaInfoCircle />, label: "Sobre" },
  ];

  const active = "bg-purple-800 font-semibold text-white shadow-md";
  const base =
    "flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 hover:bg-purple-600 text-white/90";

  return (
    <div className="h-full w-60 bg-purple-700 text-white flex flex-col justify-between shadow-lg">
      {/* topo + área rolável */}
      <div className="min-h-0 flex-1 flex flex-col overflow-y-auto">
        <div className="flex items-center justify-center py-7 text-2xl font-bold border-b border-white/10">
          <FaSync className="mr-3 animate-spin" />
          VendyX
        </div>

        <nav className="flex flex-col gap-3 mt-6 px-4 pb-6">
          {/* Home */}
          <NavLink
            to="/home"
            onClick={onLinkClick}
            className={({ isActive }) => `${base} ${isActive ? active : ""}`}
          >
            <FaHome /> Home
          </NavLink>

          {/* Produtos (submenu) */}
          <div>
            <button
              onClick={toggleProductsMenu}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-left font-medium transition-all duration-200 ${
                location.pathname.includes("/produtos") || location.pathname.includes("/categorias")
                  ? "bg-purple-800 text-white shadow-md"
                  : "hover:bg-purple-600 text-white/90"
              }`}
              aria-expanded={isProductsOpen}
              aria-controls="submenu-produtos"
            >
              <span className="flex items-center gap-3">
                <FaBox /> Produtos
              </span>
              {isProductsOpen ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
            </button>

            {isProductsOpen && (
              <div id="submenu-produtos" className="ml-6 mt-2 flex flex-col gap-2 text-sm">
                <NavLink
                  to="/produtos"
                  onClick={onLinkClick}
                  className={({ isActive }) =>
                    `pl-2 py-1 rounded-md transition ${
                      isActive ? "bg-purple-600 text-white" : "hover:bg-purple-500 text-white/90"
                    }`
                  }
                >
                  Gerenciar Produtos
                </NavLink>
                <NavLink
                  to="/categorias"
                  onClick={onLinkClick}
                  className={({ isActive }) =>
                    `pl-2 py-1 rounded-md transition ${
                      isActive ? "bg-purple-600 text-white" : "hover:bg-purple-500 text-white/90"
                    }`
                  }
                >
                  Categorias
                </NavLink>
              </div>
            )}
          </div>

          {/* Demais itens */}
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onLinkClick}
              className={({ isActive }) => `${base} ${isActive ? active : ""}`}
            >
              {item.icon} {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* rodapé */}
      <div className="text-center text-sm py-5 border-t border-white/10">
        Isabela Oliveira
        <br />
        <span className="text-xs opacity-80">(ADMIN)</span>
      </div>
    </div>
  );
}

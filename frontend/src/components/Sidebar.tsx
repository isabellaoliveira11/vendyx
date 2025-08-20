import { useEffect, useMemo, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  House, Package, ShoppingCart, UsersThree, ChartBar,
  CurrencyDollar, UserGear, Info, SignOut, CaretLeft, CaretRight, Tag,
} from 'phosphor-react';

type NavItem = { to: string; label: string; icon: React.ReactNode };

type SidebarProps = {
  collapsed?: boolean;
  onToggle?: () => void;
};

const STORAGE_KEY = 'sidebar:collapsed';

export default function Sidebar({ collapsed: controlledCollapsed, onToggle }: SidebarProps) {
  const navigate = useNavigate();

  // Inicializa o estado lendo diretamente do localStorage.
  // Isso garante que o estado inicial já é o correto e evita o "piscar".
  const [internalCollapsed, setInternalCollapsed] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved === 'true';
    } catch {
      return false;
    }
  });

  const isControlled = controlledCollapsed !== undefined;
  const collapsed = isControlled ? controlledCollapsed! : internalCollapsed;

  // O useEffect agora só se preocupa em SALVAR o estado no localStorage.
  useEffect(() => {
    if (!isControlled) {
      localStorage.setItem(STORAGE_KEY, String(collapsed));
    }
  }, [collapsed, isControlled]);

  const handleToggle = () => {
    if (isControlled) onToggle?.();
    else setInternalCollapsed(prev => !prev);
  };

  const items: NavItem[] = useMemo(
    () => [
      { to: '/home', label: 'Home', icon: <House size={20} weight="duotone" /> },
      { to: '/produtos', label: 'Produtos', icon: <Package size={20} weight="duotone" /> },
      { to: '/categorias', label: 'Categorias', icon: <Tag size={20} weight="duotone" /> },
      { to: '/vendas', label: 'Vendas', icon: <ShoppingCart size={20} weight="duotone" /> },
      { to: '/clientes', label: 'Clientes', icon: <UsersThree size={20} weight="duotone" /> },
      { to: '/relatorios', label: 'Relatórios', icon: <ChartBar size={20} weight="duotone" /> },
      { to: '/financeiro', label: 'Financeiro', icon: <CurrencyDollar size={20} weight="duotone" /> },
      { to: '/usuarios', label: 'Usuários', icon: <UserGear size={20} weight="duotone" /> },
      { to: '/sobre', label: 'Sobre', icon: <Info size={20} weight="duotone" /> },
    ],
    []
  );

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('guestMode');
    navigate('/login', { replace: true });
  };

  return (
    <aside className={[
      'sticky top-0 self-start flex-shrink-0',
      'bg-white border border-gray-100 shadow-xl rounded-r-3xl',
      'transition-[width] duration-300 ease-in-out',
      'h-screen z-40 overflow-visible',
      'w-[72px]',
      collapsed ? 'lg:w-[88px]' : 'lg:w-[260px]',
    ].join(' ')}>
      <button
        onClick={handleToggle}
        className="hidden lg:grid absolute -right-3 top-6 z-50 h-9 w-9 place-items-center rounded-full bg-purple-600 text-white shadow-lg ring-4 ring-purple-100 hover:bg-purple-700 hover:scale-105 transition"
        aria-label={collapsed ? 'Expandir menu' : 'Recolher menu'}
        type="button"
      >
        {collapsed ? <CaretRight size={18} /> : <CaretLeft size={18} />}
      </button>

      {/* Header */}
      <div className="flex items-center gap-3 px-3 pt-6 pb-4">
        <div className="grid place-items-center h-9 w-9 rounded-xl bg-purple-600 text-white font-bold">VX</div>
        {!collapsed && (
          <div className="leading-tight hidden lg:block">
            <div className="font-extrabold text-gray-900 text-lg tracking-wide">VendyX</div>
            <div className="text-[11px] text-gray-500">Dashboard</div>
          </div>
        )}
      </div>

      <div className="h-[calc(100%-88px)] overflow-y-auto no-scrollbar">
        <nav className="px-2 pt-2">
          <ul className="space-y-1">
            {items.map((item) => (
              <li key={item.to} className="relative">
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    [
                      'group relative flex items-center gap-3 rounded-xl px-3 h-11',
                      'transition-colors duration-200',
                      isActive ? 'bg-purple-100 text-purple-900' : 'text-gray-700 hover:bg-gray-100',
                    ].join(' ')
                  }
                  title={item.label}
                >
                  <span className="grid place-items-center h-9 w-9 rounded-lg shrink-0">
                    {item.icon}
                  </span>
                  {!collapsed && (
                    <span className="hidden lg:inline text-sm font-medium truncate">{item.label}</span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="my-4 mx-2 h-px bg-gray-200" />

          <button
            onClick={handleLogout}
            className="w-full group relative flex items-center gap-3 rounded-xl px-3 h-11 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
            title="Sair"
            type="button"
          >
            <span className="grid place-items-center h-9 w-9 rounded-lg shrink-0">
              <SignOut size={20} weight="duotone" />
            </span>
            {!collapsed && <span className="hidden lg:inline text-sm font-medium">Sair</span>}
          </button>
        </nav>
      </div>
    </aside>
  );
}

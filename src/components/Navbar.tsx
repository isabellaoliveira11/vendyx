// src/components/Navbar.tsx
import { useNavigate } from "react-router-dom";
import { FiMenu, FiLogOut } from "react-icons/fi";

type NavbarProps = {
  onMenuClick?: () => void;
  userName?: string;
};

export default function Navbar({ onMenuClick, userName = "Isa" }: NavbarProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
    } finally {
      navigate("/login", { replace: true });
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-gray-50/90 backdrop-blur border-b border-gray-200">
      <div className="h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-end">
        {/* Hambúrguer só no mobile */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-600 hover:bg-gray-100 transition"
            aria-label="Abrir menu"
            type="button"
          >
            <FiMenu size={24} />
          </button>
        </div>

        {/* Lado Direito */}
        <div className="flex items-center gap-4 ml-auto">
          <span className="hidden sm:inline text-sm text-gray-600">
            Olá, <span className="font-medium text-purple-700">{userName}</span>
          </span>

          {/* Botão de Logout */}
          <button
            onClick={handleLogout}
            className="group flex items-center gap-2 px-3 py-1.5 rounded-full text-sm text-gray-600 border border-gray-300 hover:bg-purple-600 hover:text-white transition"
            type="button"
            aria-label="Sair"
          >
            <FiLogOut className="text-gray-400 group-hover:text-white" size={18} />
            <span className="hidden md:inline">Sair</span>
          </button>
        </div>
      </div>
    </header>
  );
}
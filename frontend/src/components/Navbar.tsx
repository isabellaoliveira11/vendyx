import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiLogOut } from "react-icons/fi";

type NavbarProps = {
  onMenuClick?: () => void;
  userName?: string;

  collapsed?: boolean;
};

export default function Navbar({ onMenuClick, userName, collapsed }: NavbarProps) {
  const navigate = useNavigate();

  const resolvedName = useMemo(() => {
    if (userName && userName.trim()) return userName;
    const guest = localStorage.getItem("guestMode") === "true";
    if (guest) return "Convidado";
    const stored = localStorage.getItem("userName");
    return stored && stored.trim() ? stored : "Convidado";
  }, [userName]);

  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("guestMode");
      localStorage.removeItem("userName");
    } finally {
      navigate("/login", { replace: true });
    }
  };

  const leftPadClass = collapsed ? "lg:pl-[88px]" : "lg:pl-[260px]";

  return (
    <header className="sticky top-0 z-30 bg-white/70 backdrop-blur border-b border-gray-200">
      {/**/}
      <div className={`h-16 flex items-center px-4 sm:px-6 lg:px-8 ${leftPadClass}`}>
        {/*  */}
        <button
          onClick={onMenuClick}
          className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-600 hover:bg-gray-100 transition"
          aria-label="Abrir menu"
          type="button"
        >
          <FiMenu size={22} />
        </button>

        {/* */}
        <div className="ml-auto flex items-center gap-3">
          <span className="hidden sm:inline text-sm text-gray-600">
            Olá, <span className="font-medium text-purple-700">{resolvedName}</span>
          </span>

          {/* */}
          <button
            onClick={handleLogout}
            className="group flex items-center gap-2 px-3 py-1.5 rounded-full text-sm
                       text-purple-700 border border-purple-200 bg-white
                       hover:bg-purple-600 hover:text-white transition"
            type="button"
            aria-label="Sair"
          >
            <FiLogOut className="text-purple-500 group-hover:text-white" size={18} />
            <span className="hidden md:inline">Sair</span>
          </button>
        </div>
      </div>
    </header>
  );
}

// src/components/Navbar.tsx

import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Usuário deslogado");
    navigate('/login');
  };

  return (
    <nav className="w-full bg-gray-50 px-6 py-3 flex justify-end items-center">
      <button
        onClick={handleLogout}
        className="text-gray-600 hover:text-purple-700 font-medium transition-colors"
      >
        Sair
      </button>
    </nav>
  );
}

export default Navbar;

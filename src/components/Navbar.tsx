// src/components/Navbar.tsx - VERSÃO MINIMALISTA

import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Usuário deslogado");
    navigate('/login');
  };

  return (
    // 1. Fundo e sombra removidos. Alinhamento ajustado para a direita (justify-end)
    <nav className="w-full p-4 flex justify-end items-center">
      
      {/* 2. Div do logo "VendyX" foi totalmente removida. */}

      {/* 3. O botão "Sair" agora parece um link de texto simples. */}
      <button 
        onClick={handleLogout}
        className="text-gray-600 hover:text-purple-700 font-semibold transition-colors"
      >
        Sair
      </button>

    </nav>
  );
}

export default Navbar;
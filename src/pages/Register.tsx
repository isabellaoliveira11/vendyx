import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaSync } from 'react-icons/fa';
import illustration from '../assets/login-illustration.png'; // 1. Importa a imagem local

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }
    
    // Lógica para registrar o usuário no backend
    try {
        const response = await fetch('http://localhost:3333/register', { // ATENÇÃO: Verifique se a rota está correta
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();

        if(response.ok) {
            // Redireciona para o login após o sucesso
            navigate('/login'); 
        } else {
            setError(data.error || 'Erro ao realizar o cadastro.');
        }
    } catch (err) {
        setError('Erro de conexão com o servidor.');
    }
  };

  return (
    <div className="min-h-screen flex text-gray-800">
      {/* Lado da imagem */}
      <div className="hidden lg:flex w-1/2 bg-purple-50 items-center justify-center">
        {/* A imagem agora ocupa todo o espaço do container */}
        <img src={illustration} alt="Cadastro no Vendyx" className="w-full h-full object-cover" />
      </div>

      {/* Lado do formulário */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 lg:p-12 bg-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center text-4xl font-bold text-purple-700 mb-2">
              <FaSync className="mr-3" />
              VendyX
            </div>
            <h2 className="text-2xl font-semibold text-gray-700">Crie sua conta</h2>
            <p className="text-gray-500">Preencha os dados para iniciar.</p>
          </div>

          <form className="w-full space-y-5" onSubmit={handleRegister}>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaUser className="text-gray-400" />
              </span>
              <input
                type="text"
                placeholder="Nome completo"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaEnvelope className="text-gray-400" />
              </span>
              <input
                type="email"
                placeholder="Digite o seu email"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaLock className="text-gray-400" />
              </span>
              <input
                type="password"
                placeholder="Crie uma senha"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaLock className="text-gray-400" />
              </span>
              <input
                type="password"
                placeholder="Confirme sua senha"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <button
              type="submit"
              className="w-full py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-300 shadow-lg"
            >
              Cadastrar
            </button>
          </form>

          <p className="mt-8 text-sm text-center text-gray-600">
            Já tem uma conta?{' '}
            <a href="/login" className="text-purple-700 font-medium hover:underline">
              Faça login.
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaUserSecret } from 'react-icons/fa';
import illustration from '../assets/login.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('handleLogin acionada. Tentando fazer login...');
    console.log('Email:', email);

    try {
      const response = await fetch('http://localhost:3333/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: senha }),
      });

      const data = await response.json();
      console.log('Resposta da API recebida:', data);

      if (response.ok) {
        console.log('Login bem-sucedido. Salvando token.');
        localStorage.removeItem('guestMode'); // Remove a flag de convidado em um login real
        localStorage.setItem('token', data.token);
        console.log('Navegando para /home...');
        navigate('/home');
      } else {
        console.log('Login falhou. Mensagem de erro:', data.error || 'Erro desconhecido');
        setErro(data.error || 'Erro ao fazer login');
      }
    } catch (err) {
      console.error('Erro de conexão com o servidor:', err);
      setErro('Erro de conexão com o servidor');
    }
  };

  const handleGuestLogin = () => {
    console.log('handleGuestLogin acionada.');
    console.log('Entrando como convidado. Definindo a flag no localStorage.');
    localStorage.removeItem('token'); // Garante que não há um token de usuário real
    localStorage.setItem('guestMode', 'true'); // Define a flag de convidado
    console.log('Navegando para /home...');
    navigate('/home');
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row text-gray-800">
      
      {/* Lado da imagem e título */}
      <div 
        className="flex w-full lg:w-1/2 flex-col items-center justify-center p-8 sm:p-12"
        style={{ backgroundColor: '#F0EAFB' }}
      >
        <div className="max-w-lg text-center">
          <h1 className="text-3xl sm:text-5xl font-bold text-purple-700">VendyX</h1>
          <p className="text-base sm:text-xl mt-4 mb-6 text-gray-600">
            A gestão do seu negócio, simples e eficiente.
          </p>
          <img 
            src={illustration} 
            alt="Login no Vendyx" 
            className="w-3/4 sm:w-full h-auto mx-auto" 
          />
        </div>
      </div>

      {/* Formulário */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-8 bg-white">
        <div className="w-full max-w-md">
          <h2 className="text-2xl sm:text-4xl font-bold text-center text-purple-700 mb-8 tracking-wider">
            LOGIN
          </h2>

          <form className="space-y-5" onSubmit={handleLogin}>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaEnvelope className="text-gray-400" />
              </span>
              <input
                type="email"
                placeholder="Digite o seu email"
                className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaLock className="text-gray-400" />
              </span>
              <input
                type="password"
                placeholder="Digite sua senha"
                className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>

            {erro && <p className="text-red-500 text-sm text-center">{erro}</p>}

            <button
              type="submit"
              className="w-full py-2 sm:py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-300 shadow-lg"
            >
              Entrar
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-2 text-gray-500 text-sm">OU</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <button
            onClick={handleGuestLogin}
            className="w-full py-2 sm:py-3 bg-white border-2 border-purple-600 text-purple-600 rounded-lg font-semibold hover:bg-purple-600 hover:text-white transition-colors duration-300 flex items-center justify-center gap-2"
          >
            <FaUserSecret />
            Entrar como Convidado
          </button>

          <p className="mt-6 text-xs sm:text-sm text-center text-gray-600">
            É novo por aqui?{' '}
            <a href="/register" className="text-purple-700 font-medium hover:underline">
              Cadastre-se agora.
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

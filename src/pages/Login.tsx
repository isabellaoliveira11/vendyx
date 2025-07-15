import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import illustration from '../assets/login-illustration.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const response = await fetch('http://localhost:3333/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password: senha }),
    });

    const data = await response.json();

    if (response.ok) {
      // Se quiser salvar o "token" fake no localStorage (opcional)
      localStorage.setItem('token', data.token);
      navigate('/home');
    } else {
      setErro(data.error || 'Erro ao fazer login');
    }
  } catch (err) {
    setErro('Erro de conexão com o servidor');
  }
};

  return (
    <div className="min-h-screen flex">
      {/* Lado da imagem */}
      <div className="w-1/2 bg-purple-100 flex items-center justify-center p-10">
        <img src={illustration} alt="Bem-vindo ao Vendyx" className="max-w-full h-auto" />
      </div>

      {/* Lado do formulário */}
      <div className="w-1/2 flex flex-col justify-center items-center px-10">
        <h2 className="text-4xl font-bold text-purple-700 mb-2">LOGIN</h2>
        <p className="text-sm text-gray-500 mb-6">Faça agora mesmo seu login.</p>

        <form className="w-full max-w-sm space-y-4" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Digite o seu email"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Digite sua senha"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          {erro && <p className="text-red-500 text-sm">{erro}</p>}

          <button
            type="submit"
            className="w-full py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-600">
          É novo por aqui?{' '}
          <a href="/register" className="text-purple-700 font-medium hover:underline">
            Cadastre-se agora.
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;

import illustration from '../assets/login-illustration.png';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className="min-h-screen flex">
      {/* Lado da imagem */}
      <div className="w-1/2 bg-purple-100 flex items-center justify-center p-10">
        <img src={illustration} alt="Cadastro no Vendyx" className="max-w-full h-auto" />
      </div>

      {/* Lado do formulário */}
      <div className="w-1/2 flex flex-col justify-center items-center px-10">
        <h2 className="text-4xl font-bold text-purple-700 mb-2">CADASTRO</h2>
        <p className="text-sm text-gray-500 mb-6">Preencha os dados para criar sua conta.</p>

        <form className="w-full max-w-sm space-y-4">
          <input
            type="text"
            placeholder="Nome completo"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <input
            type="email"
            placeholder="Digite seu e-mail"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <input
            type="password"
            placeholder="Crie uma senha"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <input
            type="password"
            placeholder="Confirme sua senha"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          <button
            type="submit"
            className="w-full py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
          >
            Cadastrar
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-600">
          Já tem conta?{' '}
          <Link to="/" className="text-purple-700 font-medium hover:underline">
            Faça login.
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

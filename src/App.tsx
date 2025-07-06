import './App.css'; // Mantenha sua importação de App.css se já existir

function App() {
  return (
    <div className="bg-purple-600 text-white p-6 rounded-xl shadow-xl flex items-center justify-center min-h-screen">
      <h1 className="text-4xl font-extrabold mb-4 animate-bounce">
        Tailwind CSS está funcionando! 🎉
      </h1>
      <p className="text-xl text-center">
        Adicionamos estilo facilmente com classes utilitárias.
      </p>
      <button className="mt-8 px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-purple-900 font-bold rounded-full transition duration-300">
        Botão Estilizado
      </button>
    </div>
  );
}

export default App;
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8 text-center">
      <div>
        <h1 className="text-3xl font-bold mb-2">Página não encontrada</h1>
        <p className="text-gray-600">Verifique a URL ou volte para a Home.</p>
        <a href="/home" className="inline-block mt-4 px-4 py-2 rounded-lg bg-purple-600 text-white">
          Ir para Home
        </a>
      </div>
    </div>
  );
}

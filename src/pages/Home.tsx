import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import useWindowSize from '../hooks/useWindowSize'; // ou ../utils se estiver lá

function Home() {
  const { windowWidth } = useWindowSize();

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-purple-50">
        <Sidebar />

        <main className="flex-1 p-6 ml-60"> {/* margem lateral por causa da sidebar */}
          <h2 className="text-2xl font-bold text-purple-800">
            {windowWidth < 768
              ? '👋 Olá Isa! Você está no Mobile!'
              : '💻 Bem-vinda à dashboard, Isa!'}
          </h2>
          <p className="text-sm text-purple-600 mt-2">
            Aqui você verá todos os dados incríveis da Vendyx.
          </p>

          <div className="mt-10 bg-white p-4 rounded shadow text-purple-700">
            {windowWidth < 768
              ? 'Essa é uma visualização MOBILE 📱'
              : 'Essa é uma visualização DESKTOP 🖥️'}
          </div>
        </main>
      </div>
    </>
  );
}

export default Home;

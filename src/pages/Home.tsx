import Navbar from '../components/Navbar';

function Home() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-purple-100 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-semibold text-purple-800">Bem-vinda à dashboard, Isa! 💻</h2>
        <p className="text-gray-700 mt-2">Aqui você verá todos os dados incríveis da Vendyx.</p>
      </div>
    </>
  );
}

export default Home;

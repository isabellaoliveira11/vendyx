import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="w-full bg-purple-700 text-white py-4 px-6 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">Vendyx</h1>
      <div className="space-x-4">
        <Link to="/home" className="hover:text-purple-300 transition">Home</Link>
        <Link to="/" className="hover:text-purple-300 transition">Sair</Link>
      </div>
    </nav>
  );
}

export default Navbar;

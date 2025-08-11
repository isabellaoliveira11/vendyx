// src/pages/Users.tsx
import {
  FaUsers,
  FaPlus,
  FaUserShield,
  FaUserEdit,
  FaTrashAlt,
} from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

// Dados mocados para a tabela de usuários
const mockUsers = [
  {
    id: 1,
    name: 'Isabela Oliveira',
    email: 'isabela.oliveira@vendyx.com',
    role: 'Admin',
  },
  {
    id: 2,
    name: 'Carlos Pereira',
    email: 'carlos.pereira@vendyx.com',
    role: 'Vendedor',
  },
  {
    id: 3,
    name: 'Ana Souza',
    email: 'ana.souza@vendyx.com',
    role: 'Vendedor',
  },
];

function Users() {
  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 p-6">
          {/* Cabeçalho */}
          <div className="flex items-center gap-3 mb-6">
            <FaUsers size={28} className="text-purple-700" />
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Usuários</h2>
              <p className="text-sm text-gray-600 mt-0.5">
                Gerencie os usuários e permissões do sistema.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-5 gap-6">
            {/* Formulário de Novo Usuário */}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-md border border-purple-200 h-fit">
              <h3 className="text-lg font-semibold text-purple-700 mb-4">Adicionar Novo Usuário</h3>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome Completo</label>
                  <input type="text" id="name" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm" placeholder="Ex: João da Silva" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input type="email" id="email" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm" placeholder="joao.silva@email.com" />
                </div>
                 <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha</label>
                  <input type="password" id="password" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm" placeholder="••••••••" />
                </div>
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700">Cargo</label>
                  <select id="role" className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm">
                    <option>Vendedor</option>
                    <option>Admin</option>
                  </select>
                </div>
                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                  <FaPlus className="mr-2" />
                  Adicionar Usuário
                </button>
              </form>
            </div>

            {/* Tabela de Usuários */}
            <div className="lg:col-span-3 bg-white p-6 rounded-2xl shadow-md border border-purple-200">
              <h3 className="text-lg font-semibold text-purple-700 mb-4">Todos os Usuários</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-700">
                  <thead className="text-xs text-purple-800 uppercase bg-purple-100">
                    <tr>
                      <th scope="col" className="px-6 py-3 rounded-l-md">Nome</th>
                      <th scope="col" className="px-6 py-3">Email</th>
                      <th scope="col" className="px-6 py-3">Cargo</th>
                      <th scope="col" className="px-6 py-3 rounded-r-md text-center">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockUsers.map((user) => (
                      <tr key={user.id} className="bg-white border-b hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                          {user.name}
                        </td>
                        <td className="px-6 py-4">
                          {user.email}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            user.role === 'Admin'
                              ? 'bg-purple-200 text-purple-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            <FaUserShield className="inline mr-1 mb-0.5" />
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex justify-center gap-4">
                            <button className="text-blue-600 hover:text-blue-800" title="Editar">
                              <FaUserEdit size={16} />
                            </button>
                            <button className="text-red-600 hover:text-red-800" title="Excluir">
                              <FaTrashAlt size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Users;

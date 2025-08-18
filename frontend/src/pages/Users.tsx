import {
  FaUsers,
  FaPlus,
  FaUserShield,
  FaUserEdit,
  FaTrashAlt,
} from 'react-icons/fa';

const mockUsers = [
  { id: 1, name: 'Isabela Oliveira', email: 'isabela.oliveira@vendyx.com', role: 'Admin' },
  { id: 2, name: 'Carlos Pereira',   email: 'carlos.pereira@vendyx.com',   role: 'Vendedor' },
  { id: 3, name: 'Ana Souza',        email: 'ana.souza@vendyx.com',        role: 'Vendedor' },
];

export default function Users() {
  return (
    <div className="p-4 sm:p-6">
      {/* Cabeçalho */}
      <div className="flex items-center gap-3 mb-6 sm:mb-8">
        <FaUsers className="text-purple-700 text-2xl sm:text-[28px]" />
        <div className="min-w-0">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 truncate">Usuários</h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
            Gerencie os usuários e permissões do sistema.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-4 sm:gap-6">
        {/* Formulário (2/5) */}
        <section className="lg:col-span-2 bg-white p-4 sm:p-6 rounded-2xl shadow-md border border-gray-200 h-fit">
          {/* TÍTULO PRETO */}
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Adicionar Novo Usuário</h3>

          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              alert('Mock: criar usuário');
            }}
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome Completo</label>
              <input
                id="name" type="text" placeholder="Ex: João da Silva"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-sm"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                id="email" type="email" placeholder="joao.silva@email.com"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-sm"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha</label>
              <input
                id="password" type="password" placeholder="••••••••"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-sm"
              />
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">Cargo</label>
              <select
                id="role" defaultValue="Vendedor"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-sm"
              >
                <option>Vendedor</option>
                <option>Admin</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-md text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 shadow motion-safe:transition"
            >
              <FaPlus />
              Adicionar Usuário
            </button>
          </form>
        </section>

        {/* Lista / Tabela (3/5) */}
        <section className="lg:col-span-3 bg-white p-4 sm:p-6 rounded-2xl shadow-md border border-gray-200">
          {/* TÍTULO PRETO */}
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Todos os Usuários</h3>

          {/* MOBILE: cards */}
          <div className="md:hidden space-y-3">
            {mockUsers.map((user) => (
              <div key={user.id} className="border border-gray-200 rounded-xl p-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900 text-sm">{user.name}</p>
                    <p className="text-xs text-gray-600 break-all">{user.email}</p>
                    <div className="mt-2">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-semibold ${
                          user.role === 'Admin' ? 'bg-purple-200 text-purple-800' : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        <FaUserShield />
                        {user.role}
                      </span>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      type="button" aria-label={`Editar ${user.name}`}
                      className="h-9 w-9 grid place-items-center rounded-md text-blue-600 hover:bg-blue-50 motion-safe:transition"
                      onClick={() => alert('Mock: editar usuário')}
                    >
                      <FaUserEdit size={16} />
                    </button>
                    <button
                      type="button" aria-label={`Excluir ${user.name}`}
                      className="h-9 w-9 grid place-items-center rounded-md text-red-600 hover:bg-red-50 motion-safe:transition"
                      onClick={() => {
                        if (confirm('Tem certeza que deseja excluir este usuário?')) alert('Mock: excluir usuário');
                      }}
                    >
                      <FaTrashAlt size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* DESKTOP: tabela limpa, sem rolagem horizontal */}
          <div className="hidden md:block">
            <table className="w-full table-auto text-sm text-left text-gray-700">
              <thead>
                <tr className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
                  <th className="py-3 px-4">Nome</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Cargo</th>
                  <th className="py-3 px-4 text-center">Ações</th>
                </tr>
              </thead>

              <tbody>
                {mockUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-t border-gray-100 hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-4 font-medium text-gray-900">
                      {user.name}
                    </td>

                    {/* quebra o email se faltar espaço */}
                    <td className="py-3 px-4 text-gray-600 whitespace-normal break-words">
                      {user.email}
                    </td>

                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                          user.role === 'Admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-50 text-blue-700'
                        } ring-1 ring-inset ${user.role === 'Admin' ? 'ring-purple-200' : 'ring-blue-200'}`}
                      >
                        <FaUserShield />
                        {user.role}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex justify-center gap-2">
                        <button
                          type="button" aria-label={`Editar ${user.name}`}
                          className="h-9 w-9 grid place-items-center rounded-md text-blue-600 hover:bg-blue-50 transition"
                          onClick={() => alert('Mock: editar usuário')}
                        >
                          <FaUserEdit size={16} />
                        </button>
                        <button
                          type="button" aria-label={`Excluir ${user.name}`}
                          className="h-9 w-9 grid place-items-center rounded-md text-red-600 hover:bg-red-50 transition"
                          onClick={() => {
                            if (confirm('Tem certeza que deseja excluir este usuário?')) alert('Mock: excluir usuário');
                          }}
                        >
                          <FaTrashAlt size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

import { PencilSimple, Trash } from 'phosphor-react';
import { SpinnerGap } from 'phosphor-react';

interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
}

interface ClienteTableProps {
  clientes: Client[];
  loading: boolean;
  onEdit: (cliente: Client) => void;
  onDelete: (id: string) => void;
}

export default function ClienteTable({ clientes, loading, onEdit, onDelete }: ClienteTableProps) {

  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este cliente? Esta ação é irreversível.')) {
      onDelete(id);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-purple-100">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-gray-700 border-separate border-spacing-y-2">
          <thead>
            <tr className="text-left bg-purple-100 text-purple-700 uppercase font-semibold text-xs rounded-lg">
              <th className="py-3 px-4 rounded-l-lg">#</th>
              <th className="py-3 px-4">Nome</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Telefone</th>
              <th className="py-3 px-4 rounded-r-lg">Ações</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  <div className="flex justify-center items-center">
                    <SpinnerGap className="animate-spin" size={28} />
                    <span className="ml-3 text-lg">Carregando clientes...</span>
                  </div>
                </td>
              </tr>
            ) : clientes.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-400 italic">
                  Nenhum cliente encontrado.
                </td>
              </tr>
            ) : (
              clientes.map((cliente, index) => (
                <tr
                  key={cliente.id}
                  className="hover:bg-gray-50 transition duration-150 ease-in-out shadow-sm rounded-lg"
                >
                  <td className="py-3 px-4 rounded-l-lg text-gray-600">{index + 1}</td>
                  <td className="py-3 px-4">{cliente.name}</td>
                  <td className="py-3 px-4">{cliente.email}</td>
                  <td className="py-3 px-4">{cliente.phone || '—'}</td>
                  <td className="py-3 px-4 rounded-r-lg">
                    <div className="flex gap-2 items-center">
                      <button
                        className="text-blue-500 hover:text-blue-700 transition"
                        title="Editar"
                        onClick={() => onEdit(cliente)}
                      >
                        <PencilSimple size={20} weight="bold" />
                      </button>
                      <button
                        onClick={() => handleDelete(cliente.id)}
                        className="text-red-500 hover:text-red-700 transition"
                        title="Remover"
                      >
                        <Trash size={20} weight="bold" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

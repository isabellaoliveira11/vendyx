import { Trash, SpinnerGap, WarningCircle } from 'phosphor-react';
import toast from 'react-hot-toast';
import type { Client } from '../types/client'; // 👈 importa o tipo unificado

interface ClienteTableProps {
  clientes: Client[]; // 👈 usa o tipo correto
  loading: boolean;
  onDelete: (id: string) => void;
  onEdit: (cliente: Client) => void;
}

export default function ClienteTable({ clientes, loading, onDelete, onEdit }: ClienteTableProps) {
  const handleDelete = (id: string) => {
    toast((t) => (
      <div className="p-4 bg-white rounded-lg shadow-lg flex items-center gap-4">
        <WarningCircle size={48} className="text-red-500" />
        <div>
          <p className="font-semibold text-gray-800">Confirmação de Exclusão</p>
          <p className="text-gray-600 text-sm">Tem certeza que deseja excluir este cliente? Esta ação é irreversível.</p>
          <div className="mt-4 flex gap-2">
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  await toast.promise(
                    new Promise((resolve) => {
                      setTimeout(() => {
                        onDelete(id);
                        resolve(true);
                      }, 1000);
                    }),
                    {
                      loading: 'Excluindo cliente...',
                      success: 'Cliente excluído com sucesso!',
                      error: 'Erro ao excluir cliente.',
                    }
                  );
                } catch (error) {
                  console.error(error);
                }
              }}
              className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600 transition"
            >
              Excluir
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="bg-gray-200 text-gray-800 px-3 py-1 rounded-md text-sm hover:bg-gray-300 transition"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    ), { duration: Infinity, position: 'top-center' });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-purple-100">
      <div className="overflow-x-auto">
        <p className="mb-4 text-sm text-gray-500">
          Atualmente há <strong>{clientes.length}</strong> cliente{clientes.length !== 1 && 's'} cadastrados.
        </p>
        <table className="w-full text-sm text-gray-700 border-separate border-spacing-y-2">
          <thead>
            <tr className="text-left bg-purple-100 text-purple-700 uppercase font-semibold text-xs rounded-lg">
              <th className="py-3 px-4 rounded-l-lg">#</th>
              <th className="py-3 px-4">Nome</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Telefone</th>
              <th className="py-3 px-4 rounded-r-lg text-center">Ações</th>
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
                <tr key={cliente.id} className="hover:bg-gray-50 transition duration-150 ease-in-out shadow-sm rounded-lg">
                  <td className="py-3 px-4 rounded-l-lg text-gray-600">{index + 1}</td>
                  <td className="py-3 px-4">{cliente.name}</td>
                  <td className="py-3 px-4">{cliente.email}</td>
                  <td className="py-3 px-4">{cliente.phone || '—'}</td>
                  <td className="py-3 px-4 rounded-r-lg text-center">
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => onEdit(cliente)}
                        className="text-blue-500 hover:text-blue-700 transition"
                        title="Editar"
                      >
                        ✏️
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

import { PencilSimple, Trash, SpinnerGap } from 'phosphor-react';

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
  boxed?: boolean;
}

export default function ClienteTable({
  clientes,
  loading,
  onEdit,
  onDelete,
  boxed = true,
}: ClienteTableProps) {
  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      onDelete(id);
    }
  };

  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) =>
    boxed ? (
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md border border-purple-100">
        {children}
      </div>
    ) : (
      <>{children}</>
    );

  if (loading) {
    return (
      <Wrapper>
        <div className="flex justify-center items-center py-10 text-gray-500">
          <SpinnerGap className="animate-spin" size={28} />
          <span className="ml-3 text-base sm:text-lg">Carregando clientes...</span>
        </div>
      </Wrapper>
    );
  }

  if (!loading && clientes.length === 0) {
    return (
      <Wrapper>
        <div className="text-center py-8 text-gray-400 italic">
          Nenhum cliente encontrado.
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {/* Mobile: cards empilhados */}
      <div className="md:hidden space-y-3">
        {clientes.map((c, i) => (
          <div key={c.id} className="rounded-lg border border-gray-200 p-4">
            <p className="text-xs text-gray-500 mb-1">#{i + 1}</p>
            <h4 className="font-semibold text-gray-900">{c.name}</h4>
            <p className="text-sm text-gray-700">{c.email}</p>
            {c.phone && <p className="text-sm text-gray-500 mt-1">{c.phone}</p>}
            {c.address && <p className="text-xs text-gray-400 mt-1">{c.address}</p>}

            <div className="flex justify-end gap-2 mt-4">
              <button
                className="inline-flex items-center justify-center h-9 w-9 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100"
                title="Editar"
                aria-label={`Editar ${c.name}`}
                onClick={() => onEdit(c)}
              >
                <PencilSimple size={18} />
              </button>
              <button
                className="inline-flex items-center justify-center h-9 w-9 rounded-md bg-red-50 text-red-600 hover:bg-red-100"
                title="Remover"
                aria-label={`Remover ${c.name}`}
                onClick={() => handleDelete(c.id)}
              >
                <Trash size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: tabela limpa */}
      <div className="hidden md:block">
        <table className="w-full text-sm text-gray-700 border-separate border-spacing-y-2 min-w-[720px]">
          <thead>
            <tr className="text-left bg-purple-100 text-purple-700 uppercase font-semibold text-xs rounded-lg">
              <th className="py-3 px-4 rounded-l-lg w-10">#</th>
              <th className="py-3 px-4">Nome</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Telefone</th>
              <th className="py-3 px-4 rounded-r-lg text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((c, i) => (
              <tr key={c.id} className="hover:bg-gray-50 transition">
                <td className="py-3 px-4 text-gray-600 rounded-l-lg">{i + 1}</td>
                <td className="py-3 px-4 font-medium text-gray-900">{c.name}</td>
                <td className="py-3 px-4">{c.email}</td>
                <td className="py-3 px-4">{c.phone || '—'}</td>
                <td className="py-3 px-4 rounded-r-lg">
                  <div className="flex justify-center gap-2">
                    <button
                      className="text-blue-600 hover:text-blue-800 p-2 rounded-md hover:bg-blue-50"
                      title="Editar"
                      onClick={() => onEdit(c)}
                    >
                      <PencilSimple size={18} />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-700 p-2 rounded-md hover:bg-red-50"
                      title="Remover"
                      onClick={() => handleDelete(c.id)}
                    >
                      <Trash size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Wrapper>
  );
}

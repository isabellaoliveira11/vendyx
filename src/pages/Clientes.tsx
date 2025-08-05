import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { User, MagnifyingGlass } from 'phosphor-react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import ClientForm from '../components/ClienteForm';
import ClienteTable from '../components/ClienteTable';
import { type Client } from '../types/client';
import { clientService } from '../services/clientService'; // ✅ com chaves

export default function ClientManager() {
  const [clientes, setClientes] = useState<Client[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [clienteEmEdicao, setClienteEmEdicao] = useState<Client | null>(null);

  const fetchClients = async () => {
    setLoading(true);
    try {
      const data = await clientService.getClients();
      setClientes(data);
    } catch (error) {
      toast.error('Erro ao carregar clientes.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const filteredClients = clientes.filter(cliente =>
    cliente.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (cliente: Client) => {
    setClienteEmEdicao(cliente);
  };

  const handleCancelEdit = () => {
    setClienteEmEdicao(null);
  };

  const handleDelete = async (id: string) => {
    try {
      await toast.promise(
        clientService.deleteClient(id),
        {
          loading: 'Removendo cliente...',
          success: 'Cliente removido com sucesso!',
          error: 'Erro ao remover cliente.'
        }
      );
      fetchClients();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />

        <main className="ml-60 flex-1 p-6">
          <div className="flex items-center gap-3 mb-1">
            <User size={32} className="text-purple-700" weight="duotone" />
            <h2 className="text-2xl font-bold text-gray-800">
              Clientes
            </h2>
          </div>
          <p className="text-sm text-gray-600 mb-6 -mt-1">
            Atualmente há <span className="text-purple-700 font-semibold">{clientes.length} clientes</span> cadastrados no sistema.
          </p>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="col-span-2">
              <div className="bg-white p-4 rounded-xl shadow-md border border-purple-100 flex items-center gap-2 mb-4">
                <MagnifyingGlass size={20} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Pesquisar cliente por nome..."
                  className="flex-1 p-1 outline-none focus:ring-0 border-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <ClienteTable
                clientes={filteredClients}
                loading={loading}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            </div>

            <div className="col-span-1">
              <div className="bg-white p-6 rounded-xl shadow-md border border-purple-100">
                <ClientForm
                  onClientAction={fetchClients}
                  editingClient={clienteEmEdicao}
                  onCancelEdit={handleCancelEdit}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

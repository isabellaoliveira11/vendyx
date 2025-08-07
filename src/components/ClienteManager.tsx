import { useEffect, useState } from 'react';
import axios from 'axios';
import { User, MagnifyingGlass } from 'phosphor-react';
import toast from 'react-hot-toast';

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import ClientForm from '../components/ClienteForm';
import ClienteTable from '../components/ClienteTable';

const API_URL = 'http://localhost:3333';

interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
}

function ClienteManager() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingClient, setEditingClient] = useState<Client | null>(null);

  // Busca clientes da API
  const fetchClients = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/clients`);
      setClients(res.data);
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

  // Filtra clientes pelo nome
  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Seleciona cliente para editar
  const handleEdit = (client: Client) => {
    setEditingClient(client);
  };

  // Cancela edição
  const handleCancelEdit = () => {
    setEditingClient(null);
  };

  // Excluir cliente e atualizar lista localmente
  const handleDelete = async (id: string) => {
    try {
      await toast.promise(
        axios.delete(`${API_URL}/clients/${id}`),
        {
          loading: 'Removendo cliente...',
          success: 'Cliente removido com sucesso!',
          error: 'Erro ao remover cliente.',
        }
      );
      // Atualiza a lista local removendo o cliente deletado
      setClients(prevClients => prevClients.filter(client => client.id !== id));
    } catch (error) {
      console.error(error);
      toast.error('Erro ao remover cliente.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />

        <main className="flex-1 p-6">
          <div className="flex items-center gap-3 mb-1">
            <User size={32} className="text-purple-700" weight="duotone" />
            <h2 className="text-2xl font-bold text-gray-800">Clientes</h2>
          </div>

          <p className="text-sm text-gray-600 mb-6 -mt-1">
            Atualmente há <span className="text-purple-700 font-semibold">{clients.length} clientes</span> cadastrados.
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
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>

            <div className="col-span-1">
              <div className="bg-white p-6 rounded-xl shadow-md border border-purple-100">
                <ClientForm
                  editingClient={editingClient}
                  onClientAction={fetchClients}
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

export default ClienteManager;

import { useEffect, useState } from 'react';
import axios from 'axios';
import { User, MagnifyingGlass, X } from 'phosphor-react';
import toast from 'react-hot-toast';

import { API_URL } from '../config/api';
import ClientForm from '../components/ClienteForm';
import ClienteTable from '../components/ClienteTable';

interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
}

export default function Clientes() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingClient, setEditingClient] = useState<Client | null>(null);

  async function fetchClients() {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/clients`);
      setClients(res.data);
    } catch (error) {
      console.error(error);
      toast.error('Erro ao carregar clientes.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchClients();
  }, []);

  const filteredClients = clients.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (client: Client) => setEditingClient(client);
  const handleCancelEdit = () => setEditingClient(null);

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
      setClients((prev) => prev.filter((c) => c.id !== id));
      if (editingClient?.id === id) setEditingClient(null);
    } catch (error) {
      console.error(error);
      toast.error('Erro ao remover cliente.');
    }
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-1">
        <User size={32} className="text-purple-700" weight="duotone" />
        <h2 className="text-2xl font-bold text-gray-800">Clientes</h2>
      </div>
      <p className="text-sm text-gray-600 mb-6 -mt-1">
        Atualmente há{' '}
        <span className="text-purple-700 font-semibold">{clients.length} clientes</span> cadastrados.
      </p>

      {/* Grid principal responsivo */}
      <div className="flex flex-col-reverse lg:grid lg:grid-cols-3 gap-6">
        {/* Lista + busca */}
        <section className="lg:col-span-2 w-full">
          {/* Busca */}
          <div className="bg-white p-3 sm:p-4 rounded-xl shadow-md border border-purple-100 flex items-center gap-2 mb-4">
            <MagnifyingGlass size={20} className="text-gray-400" />
            <input
              type="text"
              placeholder="Pesquisar cliente por nome..."
              className="flex-1 py-1 outline-none border-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="text-gray-400 hover:text-gray-600 transition"
                aria-label="Limpar busca"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Lista de clientes sem forçar rolagem lateral */}
          <div className="overflow-x-auto lg:overflow-visible">
            <ClienteTable
              clientes={filteredClients}
              loading={loading}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </section>

        {/* Formulário de cliente */}
        <aside className="w-full">
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md border border-purple-100">
            <ClientForm
              editingClient={editingClient}
              onClientAction={fetchClients}
              onCancelEdit={handleCancelEdit}
            />
          </div>
        </aside>
      </div>
    </div>
  );
}

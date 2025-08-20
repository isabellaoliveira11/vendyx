import { useEffect, useState } from 'react';
import axios from 'axios';
import { PencilSimple, TrashSimple } from 'phosphor-react';
import SaleForm from '../components/SalesForm';

const BASE = 'http://localhost:3333';

type Client = {
  id: string;
  name: string;
};

type Sale = {
  id: string;
  clientName: string;
  total: number;
  createdAt: string;
  itemsCount: number;
};

export default function Sales() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  const money = (v: number) =>
    v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const fetchVendas = async () => {
    try {
      const res = await axios.get(`${BASE}/sales`);
      setSales(res.data);
    } catch (err) {
      console.error('Erro ao buscar vendas', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchClients = async () => {
    try {
      const res = await axios.get(`${BASE}/clients`);
      setClients(res.data);
    } catch (err) {
      console.error('Erro ao buscar clientes', err);
    }
  };

  useEffect(() => {
    fetchVendas();
    fetchClients();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta venda?')) return;
    try {
      await axios.delete(`${BASE}/sales/${id}`);
      setSales((prev) => prev.filter((s) => s.id !== id));
    } catch {
      alert('Erro ao deletar venda.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <SaleForm onVendaCriada={fetchVendas} clientes={clients} />
        </div>

        <aside className="lg:col-span-2 bg-white p-4 sm:p-6 rounded-2xl shadow-md border border-purple-200">
          <h3 className="text-lg font-semibold text-purple-700 mb-4">
            Todas as Vendas Registradas
          </h3>

          <div className="w-full overflow-x-auto lg:overflow-x-visible">
            <table className="w-full text-sm text-gray-700 table-auto">
              <thead>
                <tr className="bg-purple-100 text-purple-800 text-left">
                  <th className="py-3 px-4 rounded-l-md whitespace-nowrap">Código</th>
                  <th className="py-3 px-4 whitespace-nowrap">Cliente</th>
                  <th className="py-3 px-4 whitespace-nowrap">Itens</th>
                  <th className="py-3 px-4 whitespace-nowrap">Valor</th>
                  <th className="py-3 px-4 rounded-r-md whitespace-nowrap">Ações</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-gray-500">
                      Carregando vendas…
                    </td>
                  </tr>
                ) : sales.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-6 text-gray-400 italic">
                      Nenhuma venda cadastrada.
                    </td>
                  </tr>
                ) : (
                  sales.map((venda) => (
                    <tr
                      key={venda.id}
                      className="border-b border-gray-100 hover:bg-purple-50 transition"
                    >
                      <td className="px-4 py-3 font-mono text-sm text-gray-600">
                        {venda.id.slice(0, 6)}
                      </td>
                      <td className="px-4 py-3">
                        {venda.clientName || 'Cliente não encontrado'}
                      </td>
                      <td className="px-4 py-3">{venda.itemsCount}</td>
                      <td className="px-4 py-3 font-semibold text-purple-600">
                        {money(venda.total)}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-3 items-center">
                          <button
                            className="text-blue-600 hover:scale-110 transition"
                            onClick={() => alert('Função de edição ainda não implementada')}
                            title="Editar"
                          >
                            <PencilSimple size={20} weight="bold" />
                          </button>
                          <button
                            className="text-red-500 hover:scale-110 transition"
                            onClick={() => handleDelete(venda.id)}
                            title="Excluir"
                          >
                            <TrashSimple size={20} weight="bold" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </aside>
      </div>
    </div>
  );
}

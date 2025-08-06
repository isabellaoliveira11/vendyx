import { useEffect, useState } from 'react';
import axios from 'axios';
import { PencilSimple, TrashSimple, ShoppingCart } from 'phosphor-react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import SaleForm from '../components/SalesForm';

type Sale = {
  id: string;
  clientName: string;
  total: number;
  createdAt: string;
  itemsCount: number;
};

function Sales() {
  const [sales, setSales] = useState<Sale[]>([]);

  const fetchVendas = () => {
    axios
      .get('http://localhost:3333/sales')
      .then((res) => setSales(res.data))
      .catch((err) => console.error('Erro ao buscar vendas', err));
  };

  useEffect(() => {
    fetchVendas();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmar = confirm('Tem certeza que deseja excluir esta venda?');
    if (!confirmar) return;

    try {
      await axios.delete(`http://localhost:3333/sales/${id}`);
      setSales((prev) => prev.filter((sale) => sale.id !== id));
    } catch (err) {
      alert('Erro ao deletar venda.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />

        <main className="flex-1 px-6 pt-4">
          {/* Título + Subtítulo */}
          <div className="mb-6">
            <div className="flex items-center gap-3">
              <ShoppingCart size={28} className="text-[#9333EA]" weight="duotone" />
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Vendas</h2>
                <p className="text-sm text-gray-500 mt-0.5">
                  Gerencie as vendas realizadas no sistema.
                </p>
              </div>
            </div>
          </div>

          {/* Grid: formulário maior e tabela menor */}
          <div className="grid lg:grid-cols-5 gap-6">
            {/* Formulário - 3/5 da tela */}
            <div className="col-span-3">
              {/* Aqui deixamos APENAS o card que já está no componente SaleForm */}
              <SaleForm onVendaCriada={fetchVendas} />
            </div>

            {/* Tabela - 2/5 da tela */}
            <div className="col-span-2 bg-white p-6 rounded-2xl shadow-md border border-purple-200">
              <h3 className="text-lg font-semibold text-[#9333EA] mb-4">
                Todas as Vendas Registradas
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-sm text-gray-700">
                  <thead>
                    <tr className="bg-purple-100 text-purple-800 text-left">
                      <th className="py-3 px-4 rounded-l-md">Código</th>
                      <th className="py-3 px-4">Cliente</th>
                      <th className="py-3 px-4">Itens</th>
                      <th className="py-3 px-4">Valor</th>
                      <th className="py-3 px-4 rounded-r-md">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sales.length === 0 ? (
                      <tr>
                        <td
                          colSpan={5}
                          className="text-center py-6 text-gray-400 italic"
                        >
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
                            {venda.id.slice(0, 4)}
                          </td>
                          <td className="px-4 py-3">{venda.clientName}</td>
                          <td className="px-4 py-3">{venda.itemsCount}</td>
                          <td className="px-4 py-3 font-semibold text-purple-600">
                            R$ {venda.total.toFixed(2)}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex gap-3 items-center">
                              <button
                                className="text-blue-600 hover:scale-110 transition"
                                onClick={() =>
                                  alert('Função de edição ainda não implementada')
                                }
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
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Sales;

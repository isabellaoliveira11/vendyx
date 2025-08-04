import { PencilSimple, Trash, WarningCircle, SpinnerGap } from 'phosphor-react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { API_URL } from '../config/api';

// Interfaces (para tipagem dos dados)
interface Category {
  id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  categoryId: string;
  category?: Category;
}

// Propriedades que o ProductTable vai receber do componente pai
interface ProductTableProps {
  products: Product[];
  loading: boolean;
  onUpdate: () => void; // Função para recarregar a lista no componente pai
  onEdit: (product: Product) => void; // Função para editar um produto
}

export default function ProductTable({ products, loading, onUpdate, onEdit }: ProductTableProps) {

  const formatarMoeda = (valor: number) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor);

  const handleDelete = async (id: string) => {
    // Usando toast.promise para um modal de confirmação
    toast((t) => (
      <div className="p-4 bg-white rounded-lg shadow-lg flex items-center gap-4">
        <WarningCircle size={48} className="text-red-500" />
        <div>
          <p className="font-semibold text-gray-800">Confirmação de Exclusão</p>
          <p className="text-gray-600 text-sm">Tem certeza que deseja excluir este produto? Esta ação é irreversível.</p>
          <div className="mt-4 flex gap-2">
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  await toast.promise(
                    axios.delete(`${API_URL}/products/${id}`),
                    {
                      loading: 'Excluindo produto...',
                      success: 'Produto excluído com sucesso!',
                      error: 'Erro ao excluir produto. Tente novamente.'
                    }
                  );
                  onUpdate(); // Recarrega a lista no componente pai
                } catch (err) {
                  console.error('Erro ao deletar produto:', err);
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
        <table className="w-full text-sm text-gray-700 border-separate border-spacing-y-2">
          <thead>
            <tr className="text-left bg-purple-100 text-purple-700 uppercase font-semibold text-xs rounded-lg">
              <th className="py-3 px-4 rounded-l-lg">#</th>
              <th className="py-3 px-4">Nome</th>
              <th className="py-3 px-4">Preço</th>
              <th className="py-3 px-4">Estoque</th>
              <th className="py-3 px-4">Categoria</th>
              <th className="py-3 px-4 rounded-r-lg">Ações</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-500">
                  <div className="flex justify-center items-center">
                    <SpinnerGap className="animate-spin" size={28} />
                    <span className="ml-3 text-lg">Carregando produtos...</span>
                  </div>
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-400 italic">
                  Nenhum produto encontrado.
                </td>
              </tr>
            ) : (
              products.map((prod, index) => (
                <tr key={prod.id} className="hover:bg-gray-50 transition duration-150 ease-in-out shadow-sm rounded-lg">
                  <td className="py-3 px-4 rounded-l-lg text-gray-600">{index + 1}</td>
                  <td className="py-3 px-4">{prod.name}</td>
                  <td className="py-3 px-4 font-semibold text-gray-600">{formatarMoeda(prod.price)}</td>
                  <td className="py-3 px-4">
                    <span className={prod.stock === 0 ? 'text-red-500 font-bold' : 'text-gray-700'}>
                      {prod.stock}
                    </span>
                  </td>
                  <td className="py-3 px-4">{prod.category?.name || 'N/A'}</td>
                  <td className="py-3 px-4 rounded-r-lg">
                    <div className="flex gap-2 items-center">
                      <button
                        className="text-blue-500 hover:text-blue-700 transition"
                        title="Editar"
                        onClick={() => onEdit(prod)}
                      >
                        <PencilSimple size={20} weight="bold" />
                      </button>
                      <button
                        onClick={() => handleDelete(prod.id)}
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
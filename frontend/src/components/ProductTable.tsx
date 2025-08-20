import { PencilSimple, Trash, SpinnerGap } from 'phosphor-react';

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

interface ProductTableProps {
  products: Product[];
  loading: boolean;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  boxed?: boolean;
}

export default function ProductTable({
  products,
  loading,
  onEdit,
  onDelete,
  boxed = true,
}: ProductTableProps) {
  const formatarMoeda = (valor: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);

  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) =>
    boxed ? (
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md border border-gray-100">
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
          <span className="ml-3 text-base sm:text-lg">Carregando produtos...</span>
        </div>
      </Wrapper>
    );
  }

  if (!loading && products.length === 0) {
    return (
      <Wrapper>
        <div className="text-center py-8 text-gray-400 italic">
          Nenhum produto encontrado.
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-gray-700 min-w-[720px]">
          <thead>
            <tr className="text-left text-gray-500 uppercase text-xs">
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Nome</th>
              <th className="py-3 px-4">Preço</th>
              <th className="py-3 px-4">Estoque</th>
              <th className="py-3 px-4">Categoria</th>
              <th className="py-3 px-4">Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod, index) => (
              <tr
                key={prod.id}
                className="hover:bg-gray-50 transition duration-150 ease-in-out border-t border-gray-100"
              >
                <td className="py-3 px-4 text-gray-600 font-medium">{index + 1}</td>
                <td className="py-3 px-4 font-semibold text-gray-900">{prod.name}</td>
                <td className="py-3 px-4 font-semibold text-gray-800">
                  {formatarMoeda(prod.price)}
                </td>
                <td className="py-3 px-4">
                  <span className={
                    prod.stock === 0
                      ? 'text-red-600 font-semibold'
                      : 'text-gray-700 font-medium'
                  }>
                    {prod.stock}
                  </span>
                </td>
                <td className="py-3 px-4 text-gray-700">
                  {prod.category?.name || 'N/A'}
                </td>
                <td className="py-3 px-4">
                  <div className="flex gap-2 items-center">
                    <button
                      className="text-blue-600 hover:text-blue-700 transition p-2 rounded-md hover:bg-blue-50"
                      title="Editar"
                      onClick={() => onEdit(prod)}
                    >
                      <PencilSimple size={18} weight="bold" />
                    </button>
                    <button
                      onClick={() => onDelete(prod.id)}
                      className="text-red-600 hover:text-red-700 transition p-2 rounded-md hover:bg-red-50"
                      title="Remover"
                    >
                      <Trash size={18} weight="bold" />
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

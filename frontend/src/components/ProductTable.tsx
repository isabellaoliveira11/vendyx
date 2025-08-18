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
  /** se true renderiza card container (bg/borda/sombra); se false, só o conteúdo */
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
      {/* Mobile: cards */}
      <div className="md:hidden space-y-3">
        {products.map((prod) => (
          <div
            key={prod.id}
            className="rounded-lg border border-gray-200 p-4 flex flex-col gap-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-base font-semibold text-gray-900">{prod.name}</div>
                <div className="text-sm text-gray-500">{prod.category?.name || 'Sem categoria'}</div>
              </div>
              <div className="text-purple-700 font-bold">{formatarMoeda(prod.price)}</div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className={prod.stock === 0 ? 'text-red-600 font-semibold' : 'text-gray-600'}>
                Estoque: {prod.stock}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(prod)}
                  className="inline-flex items-center justify-center h-9 px-3 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                  title="Editar"
                >
                  <PencilSimple size={18} weight="bold" />
                </button>
                <button
                  onClick={() => onDelete(prod.id)}
                  className="inline-flex items-center justify-center h-9 px-3 rounded-md bg-red-50 text-red-600 hover:bg-red-100 transition"
                  title="Remover"
                >
                  <Trash size={18} weight="bold" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: tabela */}
      <div className="hidden md:block">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-gray-700 border-separate border-spacing-y-2 min-w-[720px]">
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
              {products.map((prod, index) => (
                <tr
                  key={prod.id}
                  className="hover:bg-gray-50 transition duration-150 ease-in-out shadow-sm rounded-lg"
                >
                  <td className="py-3 px-4 rounded-l-lg text-gray-600">{index + 1}</td>
                  <td className="py-3 px-4">{prod.name}</td>
                  <td className="py-3 px-4 font-semibold text-gray-700">
                    {formatarMoeda(prod.price)}
                  </td>
                  <td className="py-3 px-4">
                    <span className={prod.stock === 0 ? 'text-red-600 font-semibold' : 'text-gray-700'}>
                      {prod.stock}
                    </span>
                  </td>
                  <td className="py-3 px-4">{prod.category?.name || 'N/A'}</td>
                  <td className="py-3 px-4 rounded-r-lg">
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
      </div>
    </Wrapper>
  );
}

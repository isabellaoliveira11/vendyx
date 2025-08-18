import useWindowSize from '../hooks/useWindowSize';

function Products() {
  const { windowWidth } = useWindowSize();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-purple-800">
        {windowWidth < 768 ? '📦 Produtos (Mobile)' : '📦 Gestão de Produtos'}
      </h2>
      <p className="text-sm text-purple-600 mt-2">
        Aqui você poderá visualizar, adicionar e editar seus produtos.
      </p>

      {/* Conteúdo futuro */}
      <div className="mt-10 bg-white p-4 rounded shadow text-purple-700">
        Lista de produtos em breve...
      </div>
    </div>
  );
}

export default Products;

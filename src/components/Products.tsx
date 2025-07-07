import { useEffect } from 'react';
import { ProductTable } from './ProductTable';
import useWindowSize from '../hooks/useWindowSize';

const Products = () => {
  const { windowWidth } = useWindowSize();

  useEffect(() => {
    document.title = 'Produtos | Vendyx';
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-purple-800">
        {windowWidth < 768 ? '📦 Produtos (Mobile)' : '📦 Lista de Produtos'}
      </h2>
      <p className="text-sm text-purple-600 mt-2">
        Gerencie aqui todos os produtos cadastrados.
      </p>

      <div className="mt-6">
        <ProductTable />
      </div>
    </div>
  );
};

export default Products;

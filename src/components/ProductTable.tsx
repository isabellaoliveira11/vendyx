export interface Produto {
  id: number;
  nome: string;
  preco: number;
}

const produtosFake: Produto[] = [
  { id: 1, nome: 'Notebook Gamer', preco: 4500 },
  { id: 2, nome: 'Mouse Sem Fio', preco: 120 },
  { id: 3, nome: 'Teclado Mecânico', preco: 280 },
];

export const ProductTable = () => {
  return (
    <table className="min-w-full bg-white shadow-md rounded overflow-hidden">
      <thead>
        <tr className="bg-purple-500 text-white">
          <th className="py-3 px-4 text-left">ID</th>
          <th className="py-3 px-4 text-left">Nome</th>
          <th className="py-3 px-4 text-left">Preço</th>
        </tr>
      </thead>
      <tbody>
        {produtosFake.map((produto) => (
          <tr key={produto.id} className="border-b border-purple-100 hover:bg-purple-50">
            <td className="py-2 px-4">{produto.id}</td>
            <td className="py-2 px-4">{produto.nome}</td>
            <td className="py-2 px-4">R$ {produto.preco.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

import { useState } from 'react';

function CategoryManager() {
  const [novaCategoria, setNovaCategoria] = useState('');
  const [categorias, setCategorias] = useState<string[]>(['categoria teste 1', 'categoria teste 2']);

  const adicionarCategoria = () => {
    if (novaCategoria.trim()) {
      setCategorias([...categorias, novaCategoria]);
      setNovaCategoria('');
    }
  };

  const removerCategoria = (index: number) => {
    const novas = [...categorias];
    novas.splice(index, 1);
    setCategorias(novas);
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold text-purple-800 mb-4">Gerenciar categorias</h3>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={novaCategoria}
          onChange={(e) => setNovaCategoria(e.target.value)}
          placeholder="Digite o nome"
        />
        <button
          onClick={adicionarCategoria}
          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md font-medium transition"
        >
          + Nova categoria
        </button>
      </div>

      <table className="w-full text-sm text-gray-700">
        <thead>
          <tr className="text-left text-purple-600 border-b">
            <th className="py-1">ID</th>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((nome, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="py-1">{index + 1}</td>
              <td>{nome}</td>
              <td>
                <button
                  onClick={() => removerCategoria(index)}
                  className="text-red-500 text-lg hover:text-red-600"
                  title="Remover"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CategoryManager;

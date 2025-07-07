// src/components/CategoryManager.tsx
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
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-semibold mb-4 text-orange-500">Gerenciar categorias</h3>
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          className="border rounded p-2 w-full"
          value={novaCategoria}
          onChange={(e) => setNovaCategoria(e.target.value)}
          placeholder="Digite o nome"
        />
        <button onClick={adicionarCategoria} className="bg-orange-500 text-white px-3 rounded hover:bg-orange-600">
          + Nova categoria
        </button>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-orange-600 border-b">
            <th>ID</th>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((nome, index) => (
            <tr key={index} className="border-b">
              <td>{index + 1}</td>
              <td>{nome}</td>
              <td>
                <button onClick={() => removerCategoria(index)} className="text-red-500 font-bold mr-2">🗑</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CategoryManager;

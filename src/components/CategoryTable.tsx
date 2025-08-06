import {
  PencilSimple,
  Trash,
  Check,
  X,
  SpinnerGap,
} from 'phosphor-react';

interface Categoria {
  id: string;
  name: string;
}

interface Props {
  categorias: Categoria[];
  loading: boolean;
  editandoId: string | null;
  nomeEditado: string;
  setNomeEditado: (value: string) => void;
  iniciarEdicao: (id: string, nomeAtual: string) => void;
  cancelarEdicao: () => void;
  salvarEdicao: (id: string) => void;
  removerCategoria: (id: string) => void;
}

export default function CategoryTable({
  categorias,
  loading,
  editandoId,
  nomeEditado,
  setNomeEditado,
  iniciarEdicao,
  cancelarEdicao,
  salvarEdicao,
  removerCategoria,
}: Props) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-purple-100">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-gray-700 border-separate border-spacing-y-2">
          <thead>
            <tr className="text-center bg-purple-100 text-purple-700 uppercase font-semibold text-xs rounded-lg">
              <th className="py-3 px-4 rounded-l-lg w-10">#</th>
              <th className="py-3 px-4">Nome</th>
              <th className="py-3 px-4 rounded-r-lg w-24">Ações</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={3} className="text-center py-6 text-gray-500">
                  <div className="flex justify-center items-center">
                    <SpinnerGap className="animate-spin" size={28} />
                    <span className="ml-3 text-lg">Carregando categorias...</span>
                  </div>
                </td>
              </tr>
            ) : categorias.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center py-6 text-gray-400 italic">
                  Nenhuma categoria encontrada.
                </td>
              </tr>
            ) : (
              categorias.map((cat, index) => (
                <tr key={cat.id} className="hover:bg-gray-50 transition duration-150 ease-in-out shadow-sm rounded-lg text-center">
                  <td className="py-3 px-4 rounded-l-lg text-gray-600">{index + 1}</td>
                  <td className="py-3 px-4">
                    {editandoId === cat.id ? (
                      <input
                        className="border border-purple-300 px-2 py-1 rounded-md w-full text-sm focus:ring-1 focus:ring-purple-500 focus:outline-none"
                        value={nomeEditado}
                        onChange={(e) => setNomeEditado(e.target.value)}
                      />
                    ) : (
                      <span className="font-medium text-gray-800">
                        {cat.name}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 rounded-r-lg">
                    <div className="flex justify-center gap-2 items-center">
                      {editandoId === cat.id ? (
                        <>
                          <button
                            onClick={() => salvarEdicao(cat.id)}
                            className="text-green-600 hover:text-green-800"
                            title="Salvar"
                          >
                            <Check size={18} />
                          </button>
                          <button
                            onClick={cancelarEdicao}
                            className="text-gray-500 hover:text-gray-700"
                            title="Cancelar"
                          >
                            <X size={18} />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => iniciarEdicao(cat.id, cat.name)}
                            className="text-blue-600 hover:text-blue-800"
                            title="Editar"
                          >
                            <PencilSimple size={18} />
                          </button>
                          <button
                            onClick={() => removerCategoria(cat.id)}
                            className="text-red-500 hover:text-red-700"
                            title="Remover"
                          >
                            <Trash size={18} />
                          </button>
                        </>
                      )}
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

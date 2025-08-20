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
  /** renderiza container com bg/borda/sombra (default: true) */
  boxed?: boolean;
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
  boxed = true,
}: Props) {
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
          <span className="ml-3 text-base sm:text-lg">Carregando categorias...</span>
        </div>
      </Wrapper>
    );
  }

  if (!loading && categorias.length === 0) {
    return (
      <Wrapper>
        <div className="text-center py-8 text-gray-400 italic">
          Nenhuma categoria encontrada.
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {/* Mobile: cards */}
      <div className="md:hidden space-y-3">
        {categorias.map((cat, index) => {
          const isEditing = editandoId === cat.id;
          return (
            <div
              key={cat.id}
              className="rounded-lg border border-gray-200 p-4 flex flex-col gap-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">#{index + 1}</span>
                <div className="flex items-center gap-1.5">
                  {isEditing ? (
                    <>
                      <button
                        onClick={() => salvarEdicao(cat.id)}
                        className="inline-flex items-center justify-center h-9 w-9 rounded-md bg-green-50 text-green-600 hover:bg-green-100"
                        title="Salvar"
                        aria-label="Salvar"
                      >
                        <Check size={18} />
                      </button>
                      <button
                        onClick={cancelarEdicao}
                        className="inline-flex items-center justify-center h-9 w-9 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200"
                        title="Cancelar"
                        aria-label="Cancelar"
                      >
                        <X size={18} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => iniciarEdicao(cat.id, cat.name)}
                        className="inline-flex items-center justify-center h-9 w-9 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100"
                        title="Editar"
                        aria-label="Editar"
                      >
                        <PencilSimple size={18} />
                      </button>
                      <button
                        onClick={() => removerCategoria(cat.id)}
                        className="inline-flex items-center justify-center h-9 w-9 rounded-md bg-red-50 text-red-600 hover:bg-red-100"
                        title="Remover"
                        aria-label="Remover"
                      >
                        <Trash size={18} />
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">Nome</label>
                {isEditing ? (
                  <input
                    className="border border-purple-300 px-3 py-2 rounded-md w-full text-sm focus:ring-1 focus:ring-purple-500 focus:outline-none"
                    value={nomeEditado}
                    onChange={(e) => setNomeEditado(e.target.value)}
                    autoFocus
                  />
                ) : (
                  <div className="text-sm font-medium text-gray-900">{cat.name}</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop: tabela */}
      <div className="hidden md:block">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-gray-700 border-separate border-spacing-y-2 min-w-[480px]">
            <thead>
              <tr className="text-center text-gray-500 uppercase font-semibold text-xs rounded-lg">
                <th className="py-3 px-4 rounded-l-lg w-10">#</th>
                <th className="py-3 px-4 text-left">Nome</th>
                <th className="py-3 px-4 rounded-r-lg w-28">Ações</th>
              </tr>
            </thead>
            <tbody>
              {categorias.map((cat, index) => {
                const isEditing = editandoId === cat.id;
                return (
                  <tr
                    key={cat.id}
                    className="hover:bg-gray-50 transition shadow-sm rounded-lg text-center"
                  >
                    <td className="py-3 px-4 rounded-l-lg text-gray-600">{index + 1}</td>
                    <td className="py-3 px-4 text-left">
                      {isEditing ? (
                        <input
                          className="border border-purple-300 px-2 py-1 rounded-md w-full text-sm focus:ring-1 focus:ring-purple-500 focus:outline-none"
                          value={nomeEditado}
                          onChange={(e) => setNomeEditado(e.target.value)}
                          autoFocus
                        />
                      ) : (
                        <span className="font-medium text-gray-800">{cat.name}</span>
                      )}
                    </td>
                    <td className="py-3 px-4 rounded-r-lg">
                      <div className="flex justify-center gap-2 items-center">
                        {isEditing ? (
                          <>
                            <button
                              onClick={() => salvarEdicao(cat.id)}
                              className="text-green-600 hover:text-green-800 p-2 rounded-md hover:bg-green-50"
                              title="Salvar"
                              aria-label="Salvar"
                            >
                              <Check size={18} />
                            </button>
                            <button
                              onClick={cancelarEdicao}
                              className="text-gray-600 hover:text-gray-800 p-2 rounded-md hover:bg-gray-100"
                              title="Cancelar"
                              aria-label="Cancelar"
                            >
                              <X size={18} />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => iniciarEdicao(cat.id, cat.name)}
                              className="text-blue-600 hover:text-blue-800 p-2 rounded-md hover:bg-blue-50"
                              title="Editar"
                              aria-label="Editar"
                            >
                              <PencilSimple size={18} />
                            </button>
                            <button
                              onClick={() => removerCategoria(cat.id)}
                              className="text-red-600 hover:text-red-700 p-2 rounded-md hover:bg-red-50"
                              title="Remover"
                              aria-label="Remover"
                            >
                              <Trash size={18} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Wrapper>
  );
}
import {
  FaDollarSign,
  FaArrowCircleUp,
  FaArrowCircleDown,
  FaPlus,
  FaWallet,
} from 'react-icons/fa';
import { useState } from 'react';

const mockTransactions = [
  { id: 1, description: 'Venda do pedido #c675', date: '2025-08-11', type: 'Entrada', amount: 449.55 },
  { id: 2, description: 'Pagamento fornecedor de embalagens', date: '2025-08-10', type: 'Saída', amount: 150.0 },
  { id: 3, description: 'Venda do pedido #29e4', date: '2025-08-09', type: 'Entrada', amount: 99.9 },
  { id: 4, description: 'Compra de matéria-prima', date: '2025-08-08', type: 'Saída', amount: 320.0 },
];

function formatBRL(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export default function Financial() {
  
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState<string>('');
  const [type, setType] = useState<'Entrada' | 'Saída'>('Entrada');
  const [date, setDate] = useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ desc, amount: Number(amount), type, date });
    setDesc('');
    setAmount('');
    setType('Entrada');
    setDate('');
  };

  const entradas = mockTransactions.filter(t => t.type === 'Entrada').reduce((s, t) => s + t.amount, 0);
  const saidas   = mockTransactions.filter(t => t.type === 'Saída').reduce((s, t) => s + t.amount, 0);
  const saldo    = entradas - saidas;

  return (
    <div className="p-4 sm:p-6">
      {/* Cabeçalho */}
      <div className="flex items-center gap-3 mb-6 sm:mb-8">
        <FaDollarSign className="text-purple-700 text-2xl sm:text-[28px]" />
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Financeiro</h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
            Controle suas entradas, saídas e saldo.
          </p>
        </div>
      </div>

      {/* Cards de Resumo */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6">
        <div className="bg-white p-5 rounded-2xl shadow-md ring-1 ring-gray-100">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-500">Saldo Atual</p>
              <p className="text-2xl font-bold text-gray-900">{formatBRL(saldo)}</p>
            </div>
            <div className="h-11 w-11 grid place-items-center rounded-xl bg-gray-50 ring-1 ring-gray-200">
              <FaWallet className="text-gray-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-md ring-1 ring-gray-100">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-500">Entradas (Mês)</p>
              <p className="text-2xl font-bold text-green-600">{formatBRL(entradas)}</p>
            </div>
            <div className="h-11 w-11 grid place-items-center rounded-xl bg-green-50 ring-1 ring-green-200">
              <FaArrowCircleUp className="text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-md ring-1 ring-gray-100">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-500">Saídas (Mês)</p>
              <p className="text-2xl font-bold text-red-600">{formatBRL(saidas)}</p>
            </div>
            <div className="h-11 w-11 grid place-items-center rounded-xl bg-red-50 ring-1 ring-red-200">
              <FaArrowCircleDown className="text-red-600" />
            </div>
          </div>
        </div>
      </section>

      {/* Grid principal: formulário + lista */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Formulário de Lançamento */}
        <section className="lg:col-span-2 bg-white p-4 sm:p-6 rounded-2xl shadow-md ring-1 ring-gray-100 h-fit">
          {/* título preto */}
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Novo Lançamento</h3>

          <form className="space-y-4" onSubmit={onSubmit}>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Descrição
              </label>
              <input
                id="description"
                type="text"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="mt-1 block w-full h-11 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-sm"
                placeholder="Ex: Venda do pedido #123"
              />
            </div>

            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                Valor
              </label>
              <input
                id="amount"
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="mt-1 block w-full h-11 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-sm"
                placeholder="0,00"
              />
            </div>

            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                Tipo
              </label>
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value as 'Entrada' | 'Saída')}
                className="mt-1 block w-full h-11 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-sm"
              >
                <option>Entrada</option>
                <option>Saída</option>
              </select>
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                Data
              </label>
              <input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1 block w-full h-11 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-md text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 shadow transition"
            >
              <FaPlus />
              Adicionar Lançamento
            </button>
          </form>
        </section>

        {/* Últimos Lançamentos */}
        <section className="lg:col-span-3 bg-white p-4 sm:p-6 rounded-2xl shadow-md ring-1 ring-gray-100">
          {/* título preto */}
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Últimos Lançamentos</h3>

          {/* MOBILE: cards */}
          <div className="md:hidden space-y-3">
            {mockTransactions.map((t) => (
              <div key={t.id} className="border border-gray-200 rounded-xl p-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-medium text-gray-900 text-sm">{t.description}</p>
                    <p className="text-xs text-gray-600 mt-0.5">
                      {new Date(t.date).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
                    </p>
                    <span
                      className={`mt-2 inline-flex items-center px-2 py-1 rounded-full text-[11px] font-semibold ${
                        t.type === 'Entrada' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {t.type}
                    </span>
                  </div>
                  <div className={`shrink-0 font-semibold ${t.type === 'Entrada' ? 'text-green-600' : 'text-red-600'}`}>
                    {t.type === 'Entrada' ? '+' : '-'} {formatBRL(t.amount)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* DESKTOP: tabela clean, sem rolagem */}
          <div className="hidden md:block">
            <table className="w-full table-auto text-sm text-left text-gray-700">
              <thead>
                <tr className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
                  <th className="py-3 px-4">Descrição</th>
                  <th className="py-3 px-4">Data</th>
                  <th className="py-3 px-4">Tipo</th>
                  <th className="py-3 px-4 text-right">Valor</th>
                </tr>
              </thead>
              <tbody>
                {mockTransactions.map((t) => (
                  <tr key={t.id} className="border-t border-gray-100 hover:bg-gray-50 transition">
                    <td className="py-3 px-4 font-medium text-gray-900">{t.description}</td>
                    <td className="py-3 px-4 text-gray-600">
                      {new Date(t.date).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          t.type === 'Entrada'
                            ? 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-200'
                            : 'bg-red-50 text-red-700 ring-1 ring-inset ring-red-200'
                        }`}
                      >
                        {t.type}
                      </span>
                    </td>
                    <td className={`py-3 px-4 text-right font-medium ${t.type === 'Entrada' ? 'text-green-600' : 'text-red-600'}`}>
                      {t.type === 'Entrada' ? '+' : '-'} {formatBRL(t.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

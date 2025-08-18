// src/pages/About.tsx
import {
  FaInfoCircle,
  FaReact,
  FaNodeJs,
  FaShoppingCart,
  FaBoxOpen,
  FaUserFriends,
  FaChartLine,
  FaPiggyBank,
  FaUsersCog,
  FaExclamationTriangle,
} from 'react-icons/fa';
import { SiTypescript, SiTailwindcss, SiPrisma, SiPostgresql, SiFastify } from 'react-icons/si';

const technologies = [
  { name: 'React',       icon: <FaReact className="text-blue-500 text-xl sm:text-2xl" /> },
  { name: 'TypeScript',  icon: <SiTypescript className="text-blue-600 text-xl sm:text-2xl" /> },
  { name: 'TailwindCSS', icon: <SiTailwindcss className="text-teal-500 text-xl sm:text-2xl" /> },
  { name: 'Node.js',     icon: <FaNodeJs className="text-green-500 text-xl sm:text-2xl" /> },
  { name: 'Fastify',     icon: <SiFastify className="text-gray-800 text-xl sm:text-2xl" /> },
  { name: 'Prisma',      icon: <SiPrisma className="text-teal-600 text-xl sm:text-2xl" /> },
  { name: 'PostgreSQL',  icon: <SiPostgresql className="text-blue-700 text-xl sm:text-2xl" /> },
];

const features = [
  { name: 'Gestão de Vendas',      icon: <FaShoppingCart className="text-purple-600 text-2xl sm:text-3xl" />, description: 'Registre e acompanhe todas as suas vendas de forma simples e rápida.' },
  { name: 'Controle de Estoque',   icon: <FaBoxOpen      className="text-purple-600 text-2xl sm:text-3xl" />, description: 'Gerencie produtos e categorias, mantendo o controle total do seu inventário.' },
  { name: 'Cadastro de Clientes',  icon: <FaUserFriends  className="text-purple-600 text-2xl sm:text-3xl" />, description: 'Mantenha uma base de dados organizada com as informações dos seus clientes.' },
  { name: 'Relatórios Detalhados', icon: <FaChartLine    className="text-purple-600 text-2xl sm:text-3xl" />, description: 'Visualize o desempenho do seu negócio com relatórios e gráficos interativos.' },
  { name: 'Controle Financeiro',   icon: <FaPiggyBank    className="text-purple-600 text-2xl sm:text-3xl" />, description: 'Acompanhe suas entradas e saídas para uma visão clara da saúde financeira.' },
  { name: 'Gestão de Usuários',    icon: <FaUsersCog     className="text-purple-600 text-2xl sm:text-3xl" />, description: 'Administre os acessos e permissões dos usuários do sistema.' },
];

export default function About() {
  return (
    <div className="p-4 sm:p-6">
      {/* Cabeçalho */}
      <div className="flex items-center gap-3 mb-6 sm:mb-8">
        <FaInfoCircle className="text-purple-700 text-2xl sm:text-[28px]" />
        <div className="min-w-0">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 truncate">Sobre o VendyX</h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
            Informações sobre o projeto, tecnologias e desenvolvimento.
          </p>
        </div>
      </div>

      {/* Card principal */}
      <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl shadow-md border border-purple-200">
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-purple-700">VendyX</h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 mt-2">
            Seu Sistema de Gestão de Vendas Simplificado
          </p>
          <span className="inline-block mt-3 px-3 py-1 bg-purple-100 text-purple-800 text-[10px] sm:text-xs font-semibold rounded-full">
            Versão 1.0.0
          </span>
        </div>

        <div className="mx-auto w-full max-w-5xl">
          {/* Motivação */}
          <section className="mb-8 sm:mb-10">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4 border-b-2 border-purple-200 pb-2">
              Motivação
            </h3>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              O VendyX nasceu da necessidade de criar uma ferramenta de gestão que fosse ao mesmo tempo poderosa
              e acessível para pequenos empreendedores. A motivação foi desenvolver um sistema que simplificasse
              a complexidade do dia a dia de um negócio, permitindo que o foco do gestor estivesse no crescimento,
              e não na burocracia.
            </p>
          </section>

          {/* Funcionalidades */}
          <section className="mb-8 sm:mb-10">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4 border-b-2 border-purple-200 pb-2">
              Principais Funcionalidades
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {features.map((feature) => (
                <div
                  key={feature.name}
                  className="bg-white p-4 sm:p-5 rounded-xl shadow-md border border-gray-200
                             motion-safe:transition md:hover:shadow-lg md:hover:scale-[1.01]"
                >
                  <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-purple-100 rounded-full mb-3 sm:mb-4 mx-auto">
                    {feature.icon}
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-purple-700 text-center mb-1.5 sm:mb-2">
                    {feature.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 text-center">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Tecnologias */}
          <section className="mb-8 sm:mb-10">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4 border-b-2 border-purple-200 pb-2">
              Tecnologias Utilizadas
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
              {technologies.map((tech) => (
                <div
                  key={tech.name}
                  className="flex items-center gap-2 sm:gap-3 bg-gray-50 p-2.5 sm:p-3 rounded-lg border border-gray-200
                             motion-safe:transition md:hover:bg-gray-100"
                >
                  {tech.icon}
                  <span className="font-medium text-gray-700 text-sm sm:text-base">{tech.name}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Status do Projeto */}
          <section className="mb-8 sm:mb-10 p-3 sm:p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-md sm:rounded-r-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <FaExclamationTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400" aria-hidden="true" />
              </div>
              <div className="ml-2 sm:ml-3">
                <h3 className="text-sm sm:text-base font-medium text-yellow-800">Status do Projeto</h3>
                <p className="mt-1.5 text-xs sm:text-sm text-yellow-700">
                  O <strong>VendyX</strong> está ativo e funcional, com os principais recursos de gestão de vendas, estoque e clientes já operando.
                  A plataforma segue em evolução contínua, com novas funcionalidades e melhorias planejadas para tornar o sistema cada vez mais completo e intuitivo.
                </p>
              </div>
            </div>
          </section>

          {/* Desenvolvimento */}
          <section>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4 border-b-2 border-purple-200 pb-2">
              Desenvolvimento
            </h3>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              Este sistema foi cuidadosamente planejado e desenvolvido por{' '}
              <a
                href="https://www.isabelaoliveiradev.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-purple-700 hover:underline focus:outline-none focus:ring-2 focus:ring-purple-400 rounded"
              >
                Isabela Oliveira
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

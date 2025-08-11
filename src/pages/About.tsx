// src/pages/About.tsx
import { FaInfoCircle, FaReact, FaNodeJs, FaShoppingCart, FaBoxOpen, FaUserFriends, FaChartLine, FaPiggyBank, FaUsersCog, FaExclamationTriangle } from 'react-icons/fa';
import { SiTypescript, SiTailwindcss, SiPrisma, SiPostgresql, SiFastify } from 'react-icons/si';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const technologies = [
  { name: 'React', icon: <FaReact size={24} className="text-blue-500" /> },
  { name: 'TypeScript', icon: <SiTypescript size={24} className="text-blue-600" /> },
  { name: 'TailwindCSS', icon: <SiTailwindcss size={24} className="text-teal-500" /> },
  { name: 'Node.js', icon: <FaNodeJs size={24} className="text-green-500" /> },
  { name: 'Fastify', icon: <SiFastify size={24} className="text-gray-800" /> },
  { name: 'Prisma', icon: <SiPrisma size={24} className="text-teal-600" /> },
  { name: 'PostgreSQL', icon: <SiPostgresql size={24} className="text-blue-700" /> },
];

const features = [
    { name: 'Gestão de Vendas', icon: <FaShoppingCart size={28} className="text-purple-600" />, description: 'Registre e acompanhe todas as suas vendas de forma simples e rápida.' },
    { name: 'Controle de Estoque', icon: <FaBoxOpen size={28} className="text-purple-600" />, description: 'Gerencie produtos e categorias, mantendo o controle total do seu inventário.' },
    { name: 'Cadastro de Clientes', icon: <FaUserFriends size={28} className="text-purple-600" />, description: 'Mantenha uma base de dados organizada com as informações dos seus clientes.' },
    { name: 'Relatórios Detalhados', icon: <FaChartLine size={28} className="text-purple-600" />, description: 'Visualize o desempenho do seu negócio com relatórios e gráficos interativos.' },
    { name: 'Controle Financeiro', icon: <FaPiggyBank size={28} className="text-purple-600" />, description: 'Acompanhe suas entradas e saídas para uma visão clara da saúde financeira.' },
    { name: 'Gestão de Usuários', icon: <FaUsersCog size={28} className="text-purple-600" />, description: 'Administre os acessos e permissões dos usuários do sistema.' },
];

function About() {
  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 p-6">
          {/* Cabeçalho */}
          <div className="flex items-center gap-3 mb-8">
            <FaInfoCircle size={28} className="text-purple-700" />
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Sobre o VendyX</h2>
              <p className="text-sm text-gray-600 mt-0.5">
                Informações sobre o projeto, tecnologias e desenvolvimento.
              </p>
            </div>
          </div>

          {/* Conteúdo Principal */}
          <div className="bg-white p-8 rounded-2xl shadow-md border border-purple-200">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-purple-700">VendyX</h1>
              <p className="text-lg text-gray-600 mt-2">Seu Sistema de Gestão de Vendas Simplificado</p>
              <span className="inline-block mt-2 px-3 py-1 bg-purple-100 text-purple-800 text-sm font-semibold rounded-full">
                Versão 1.0.0
              </span>
            </div>

            <div className="max-w-4xl mx-auto">
              {/* Seção de Motivação */}
              <div className="mb-12">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-purple-200 pb-2">Motivação</h3>
                <p className="text-gray-700 leading-relaxed">
                  O VendyX nasceu da necessidade de criar uma ferramenta de gestão que fosse ao mesmo tempo poderosa e acessível para pequenos empreendedores. A motivação foi desenvolver um sistema que simplificasse a complexidade do dia a dia de um negócio, permitindo que o foco do gestor estivesse no crescimento, e não na burocracia.
                </p>
              </div>

              {/* Seção de Funcionalidades */}
              <div className="mb-12">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-purple-200 pb-2">Principais Funcionalidades</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {features.map((feature) => (
                    <div key={feature.name} className="bg-white p-6 rounded-lg shadow-md border border-gray-200 transform hover:scale-105 transition-transform duration-300 flex flex-col items-center text-center">
                      <div className="flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                        {feature.icon}
                      </div>
                      <h4 className="text-lg font-bold text-purple-700 mb-2">{feature.name}</h4>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Seção de Tecnologias */}
              <div className="mb-12">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-purple-200 pb-2">Tecnologias Utilizadas</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {technologies.map((tech) => (
                    <div key={tech.name} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
                      {tech.icon}
                      <span className="font-medium text-gray-700">{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Seção de Status do Projeto */}
              <div className="mb-12 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <FaExclamationTriangle className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-md font-medium text-yellow-800">Status do Projeto</h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <p>
                        Este projeto ainda está em fase de desenvolvimento. Algumas funcionalidades, como os módulos <strong>Financeiro</strong> e <strong>Usuários</strong>, utilizam dados de exemplo (mocados) e ainda não estão conectadas ao backend. A implementação completa está em andamento.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Seção de Desenvolvimento */}
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-3 border-b-2 border-purple-200 pb-2">Desenvolvimento</h3>
                <p className="text-gray-700 leading-relaxed">
                  Este sistema foi cuidadosamente planejado e desenvolvido por{' '}
                  <a 
                    href="https://www.isabelaoliveiradev.com/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="font-bold text-purple-700 hover:underline"
                  >
                    Isabela Oliveira
                  </a>.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default About;

import { FastifyReply, FastifyRequest } from 'fastify';

// Interface para o corpo da requisição de registro de usuário
interface RegisterUserBody {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Interface para o corpo da requisição de login
interface LoginUserBody {
  email: string;
  password: string;
}

// Banco fake temporário em memória para armazenar usuários
// ATENÇÃO: Em um projeto real, você usaria um banco de dados persistente
// e NUNCA armazenaria senhas em texto puro.
const users: { name: string; email: string; password: string }[] = [];

// Função para registrar um novo usuário
export async function registerUser(
  request: FastifyRequest<{ Body: RegisterUserBody }>,
  reply: FastifyReply
) {
  const { name, email, password, confirmPassword } = request.body;

  // Validação básica
  if (!name || !email || !password || !confirmPassword) {
    return reply.status(400).send({ error: 'Todos os campos são obrigatórios.' });
  }

  if (password !== confirmPassword) {
    return reply.status(400).send({ error: 'As senhas não coincidem.' });
  }

  // Verifica se o e-mail já foi cadastrado
  const userExists = users.find((user) => user.email === email);
  if (userExists) {
    return reply.status(409).send({ error: 'E-mail já cadastrado.' });
  }

  // Salva usuário (fake)
  users.push({ name, email, password });

  return reply.status(201).send({
    message: 'Usuário cadastrado com sucesso!',
    user: { name, email },
  });
}

// Nova função para login de usuário
export async function loginUser(
  request: FastifyRequest<{ Body: LoginUserBody }>,
  reply: FastifyReply
) {
  const { email, password } = request.body;

  // Validação básica
  if (!email || !password) {
    return reply.status(400).send({ error: 'Email e senha são obrigatórios.' });
  }

  // Busca o usuário pelo email no banco de dados fake
  const user = users.find((u) => u.email === email);

  // Verifica se o usuário existe e se a senha está correta
  if (!user || user.password !== password) {
    return reply.status(401).send({ error: 'Credenciais inválidas.' });
  }

  // Se as credenciais estiverem corretas, retorna uma resposta de sucesso
  // Em um projeto real, você geraria um token JWT aqui.
  return reply.status(200).send({
    message: 'Login realizado com sucesso!',
    token: 'fake-jwt-token-12345', // Token fake para o frontend
  });
}

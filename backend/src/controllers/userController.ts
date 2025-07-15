import { FastifyReply, FastifyRequest } from 'fastify'

interface RegisterUserBody {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export async function registerUser(
  request: FastifyRequest<{ Body: RegisterUserBody }>,
  reply: FastifyReply
) {
  const { name, email, password, confirmPassword } = request.body

  if (!name || !email || !password || !confirmPassword) {
    return reply.status(400).send({ error: 'Todos os campos são obrigatórios.' })
  }

  if (password !== confirmPassword) {
    return reply.status(400).send({ error: 'As senhas não coincidem.' })
  }

  // Simulação de sucesso
  return reply.status(201).send({
    message: 'Usuário cadastrado com sucesso!',
    user: { name, email },
  })
}

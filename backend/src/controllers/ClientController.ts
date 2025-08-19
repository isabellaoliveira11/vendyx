import { FastifyRequest, FastifyReply } from 'fastify'
import { prisma } from '../lib/prisma'

// Buscar todos os clientes
export const getAllClients = async (request: FastifyRequest, reply: FastifyReply) => {
  const clients = await prisma.client.findMany()
  return reply.send(clients)
}

// Criar cliente
export const createClient = async (request: FastifyRequest, reply: FastifyReply) => {
  const { name, email, phone, address } = request.body as {
    name: string
    email: string
    phone?: string
    address?: string
  }

  if (!name || !email) {
    return reply.status(400).send({ error: 'Nome e email são obrigatórios.' })
  }

  const newClient = await prisma.client.create({
    data: {
      name,
      email,
      phone: phone ?? null,
      address: address ?? null,
    },
  })

  return reply.status(201).send(newClient)
}

// Atualizar cliente
export const updateClient = async (
  request: FastifyRequest<{ Params: { id: string }; Body: { name: string; email: string; phone?: string; address?: string } }>,
  reply: FastifyReply
) => {
  const { id } = request.params
  const { name, email, phone, address } = request.body

  try {
    const updatedClient = await prisma.client.update({
      where: { id },
      data: {
        name,
        email,
        phone: phone ?? null,
        address: address ?? null,
      },
    })

    return reply.send(updatedClient)
  } catch (error) {
    return reply.status(404).send({ error: 'Cliente não encontrado.' })
  }
}

// Deletar cliente
export const deleteClient = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const { id } = request.params

  try {
    await prisma.client.delete({
      where: { id },
    })
    return reply.send({ message: 'Cliente deletado com sucesso!' })
  } catch (error) {
    return reply.status(404).send({ error: 'Cliente não encontrado.' })
  }
}

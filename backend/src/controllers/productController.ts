import { FastifyRequest, FastifyReply } from 'fastify'
import { prisma } from '../lib/prisma'

export const getAllProducts = async (request: FastifyRequest, reply: FastifyReply) => {
  const products = await prisma.product.findMany({
    include: {
      category: true,
    },
  })
  return reply.send(products)
}

export const createProduct = async (request: FastifyRequest, reply: FastifyReply) => {
  const { name, price, stock, categoryId } = request.body as {
    name: string
    price: number
    stock: number
    categoryId: string
  }

  if (!name || !price || !stock || !categoryId) {
    return reply.status(400).send({ error: 'Todos os campos são obrigatórios.' })
  }

  const newProduct = await prisma.product.create({
    data: {
      name,
      price,
      stock,
      categoryId,
    },
  })

  return reply.status(201).send(newProduct)
}

export const updateProduct = async (
  request: FastifyRequest<{ Params: { id: string }; Body: { name: string; price: number; stock: number; categoryId: string } }>,
  reply: FastifyReply
) => {
  const { id } = request.params
  const { name, price, stock, categoryId } = request.body

  try {
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: { name, price, stock, categoryId },
    })

    return reply.send(updatedProduct)
  } catch (error) {
    return reply.status(404).send({ error: 'Produto não encontrado.' })
  }
}

export const deleteProduct = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const { id } = request.params

  try {
    await prisma.product.delete({
      where: { id },
    })
    return reply.send({ message: 'Produto deletado com sucesso!' })
  } catch (error) {
    return reply.status(404).send({ error: 'Produto não encontrado.' })
  }
}

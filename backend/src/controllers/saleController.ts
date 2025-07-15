import { FastifyRequest, FastifyReply } from 'fastify'
import { prisma } from '../lib/prisma'
import { createSaleService } from '../services/saleService'

export const createSale = async (request: FastifyRequest, reply: FastifyReply) => {
  const { clientName, items } = request.body as {
    clientName: string
    items: { productId: string; quantity: number; price: number }[]
  }

  if (!clientName || !items || items.length === 0) {
    return reply.status(400).send({ error: 'Nome do cliente e itens são obrigatórios.' })
  }

  try {
    const sale = await createSaleService({ clientName, items })
    return reply.status(201).send(sale)
  } catch (error) {
    console.error(error)
    return reply.status(500).send({ error: 'Erro ao criar venda.' })
  }
}

export const getSales = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const sales = await prisma.sale.findMany({
      orderBy: { createdAt: 'desc' },
      include: { items: true }
    })

    const formatted = sales.map((sale) => {
      return {
        id: sale.id,
        clientName: sale.clientName,
        total: sale.total,
        createdAt: sale.createdAt,
        itemsCount: sale.items.length
      }
    })

    return reply.send(formatted)
  } catch (error) {
    console.error(error)
    return reply.status(500).send({ error: 'Erro ao buscar vendas.' })
  }
}
export const deleteSale = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string }

  try {
    await prisma.saleItem.deleteMany({
      where: { saleId: id }
    })

    await prisma.sale.delete({
      where: { id }
    })

    return reply.status(204).send() // sem conteúdo
  } catch (error) {
    console.error(error)
    return reply.status(500).send({ error: 'Erro ao deletar venda.' })
  }
}
export const getSaleById = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string }

  try {
    const sale = await prisma.sale.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            product: true // inclui nome e info do produto
          }
        }
      }
    })

    if (!sale) {
      return reply.status(404).send({ error: 'Venda não encontrada.' })
    }

    const formatted = {
      id: sale.id,
      clientName: sale.clientName,
      total: sale.total,
      createdAt: sale.createdAt,
      items: sale.items.map((item) => ({
        productId: item.productId,
        productName: item.product.name,
        quantity: item.quantity,
        price: item.price
      }))
    }

    return reply.send(formatted)
  } catch (error) {
    console.error(error)
    return reply.status(500).send({ error: 'Erro ao buscar venda.' })
  }
}


import { FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../lib/prisma';
import { createSaleService } from '../services/saleService';

export const createSale = async (request: FastifyRequest, reply: FastifyReply) => {
  const { clientName, items, paymentMethod, discount, observation } = request.body as {
    clientName: string;
    items: { productId: string; quantity: number; price: number }[];
    paymentMethod?: string;
    discount?: number;
    observation?: string;
  };

  if (!clientName || !items || items.length === 0) {
    return reply.status(400).send({ error: 'Nome do cliente e itens são obrigatórios.' });
  }

  try {
    const sale = await createSaleService({ clientName, items, paymentMethod, discount, observation });
    return reply.status(201).send(sale);
  } catch (error: any) {
    console.error('Erro no controlador de vendas:', error);

    if (error.message.includes('Estoque insuficiente')) {
      return reply.status(400).send({ error: error.message });
    }
    if (error.message.includes('não encontrado')) {
      return reply.status(404).send({ error: error.message });
    }

    return reply.status(500).send({ error: 'Erro interno do servidor ao criar venda.' });
  }
};

export const getSales = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const sales = await prisma.sale.findMany({
      orderBy: { createdAt: 'desc' },
      include: { items: true }
    });

    const formatted = sales.map((sale) => {
      return {
        id: sale.id,
        clientName: sale.clientName,
        total: sale.total,
        createdAt: sale.createdAt,
        itemsCount: sale.items.length, // Se 'itemsCount' é uma coluna do modelo Sale, use sale.itemsCount aqui
                                       // Caso contrário, esta linha está correta para contar os SaleItems
        paymentMethod: sale.paymentMethod, // Adicionado para incluir na resposta
        discount: sale.discount,           // Adicionado para incluir na resposta
        observation: sale.observation,     // Adicionado para incluir na resposta
      };
    });

    return reply.send(formatted);
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ error: 'Erro ao buscar vendas.' });
  }
};

export const deleteSale = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };

  try {
    await prisma.saleItem.deleteMany({
      where: { saleId: id }
    });

    await prisma.sale.delete({
      where: { id }
    });

    return reply.status(204).send();
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ error: 'Erro ao deletar venda.' });
  }
};

export const getSaleById = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };

  try {
    const sale = await prisma.sale.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });

    if (!sale) {
      return reply.status(404).send({ error: 'Venda não encontrada.' });
    }

    const formatted = {
      id: sale.id,
      clientName: sale.clientName,
      total: sale.total,
      createdAt: sale.createdAt,
      paymentMethod: sale.paymentMethod, // Adicionado para incluir na resposta detalhada
      discount: sale.discount,           // Adicionado para incluir na resposta detalhada
      observation: sale.observation,     // Adicionado para incluir na resposta detalhada
      items: sale.items.map((item) => ({
        productId: item.productId,
        productName: item.product.name,
        quantity: item.quantity,
        price: item.price
      }))
    };

    return reply.send(formatted);
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ error: 'Erro ao buscar venda.' });
  }
};
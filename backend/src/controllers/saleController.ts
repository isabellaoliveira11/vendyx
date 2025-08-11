// Conteúdo completo e atualizado para: backend/src/controllers/saleController.ts

import { FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../lib/prisma';
import { createSaleService } from '../services/saleService';

// -> 1. Ajustamos a função createSale para usar clientId
export const createSale = async (request: FastifyRequest, reply: FastifyReply) => {
  const { clientId, items, paymentMethod, discount, observation } = request.body as {
    clientId?: string; // -> MUDANÇA: Recebe o ID do cliente, que pode ser opcional
    items: { productId: string; quantity: number; price: number }[];
    paymentMethod?: string;
    discount?: number;
    observation?: string;
  };

  // -> MUDANÇA: A validação do nome do cliente não é mais necessária aqui
  if (!items || items.length === 0) {
    return reply.status(400).send({ error: 'Itens são obrigatórios.' });
  }

  try {
    // -> MUDANÇA: Passamos o clientId para o seu serviço de criação de venda
    const sale = await createSaleService({ clientId, items, paymentMethod, discount, observation });
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

// -> 2. Ajustamos a função getSales para buscar o nome do cliente através da relação
export const getSales = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const sales = await prisma.sale.findMany({
      orderBy: { createdAt: 'desc' },
      include: { 
        items: true,
        client: true // -> MUDANÇA: Incluímos os dados do cliente relacionado
      }
    });

    const formatted = sales.map((sale) => {
      return {
        id: sale.id,
        // -> MUDANÇA: Pegamos o nome do cliente da relação. Se não houver cliente, usamos um texto padrão.
        clientName: sale.client?.name || 'Consumidor Final', 
        total: sale.total,
        createdAt: sale.createdAt,
        itemsCount: sale.itemsCount,
        paymentMethod: sale.paymentMethod,
        discount: sale.discount,
        observation: sale.observation,
      };
    });

    return reply.send(formatted);
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ error: 'Erro ao buscar vendas.' });
  }
};

// A função deleteSale não precisa de alterações, pois não lida com o nome do cliente.
export const deleteSale = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };

  try {
    const saleToDelete = await prisma.sale.findUnique({
      where: { id },
      include: { items: true }
    });
    
    if (!saleToDelete) {
      return reply.status(404).send({ error: 'Venda não encontrada.' });
    }

    const transaction = await prisma.$transaction(async (tx) => {
      for (const item of saleToDelete.items) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { increment: item.quantity } },
        });
      }
      await tx.saleItem.deleteMany({ where: { saleId: id } });
      await tx.sale.delete({ where: { id } });
      return true;
    });

    return reply.status(204).send();
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ error: 'Erro ao deletar venda.' });
  }
};

// -> 3. Ajustamos a função getSaleById, similar à getSales
export const getSaleById = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };

  try {
    const sale = await prisma.sale.findUnique({
      where: { id },
      include: {
        items: {
          include: { product: true }
        },
        client: true // -> MUDANÇA: Incluímos os dados do cliente
      }
    });

    if (!sale) {
      return reply.status(404).send({ error: 'Venda não encontrada.' });
    }

    const formatted = {
      id: sale.id,
      // -> MUDANÇA: Pegamos o nome do cliente da relação
      clientName: sale.client?.name || 'Consumidor Final',
      total: sale.total,
      createdAt: sale.createdAt,
      itemsCount: sale.itemsCount,
      paymentMethod: sale.paymentMethod,
      discount: sale.discount,
      observation: sale.observation,
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


// -> 4. Ajustamos a função getSalesReport, também para incluir o nome do cliente
export const getSalesReport = async (request: FastifyRequest, reply: FastifyReply) => {
  const { startDate, endDate, paymentMethod } = request.query as { 
    startDate?: string; 
    endDate?: string; 
    paymentMethod?: string; 
  };

  try {
    const whereClause: any = {};

    if (startDate) { whereClause.createdAt = { ...whereClause.createdAt, gte: new Date(startDate) }; }
    if (endDate) {
      const endOfDay = new Date(endDate);
      endOfDay.setDate(endOfDay.getDate() + 1);
      whereClause.createdAt = { ...whereClause.createdAt, lt: endOfDay };
    }
    if (paymentMethod && paymentMethod !== '') { whereClause.paymentMethod = paymentMethod; }

    const sales = await prisma.sale.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
      include: {
        client: true // -> MUDANÇA: Incluímos os dados do cliente
      }
    });
    
    const formatted = sales.map((sale) => ({
      id: sale.id,
      // -> MUDANÇA: Pegamos o nome do cliente da relação
      clientName: sale.client?.name || 'Consumidor Final',
      total: sale.total,
      createdAt: sale.createdAt,
      itemsCount: sale.itemsCount,
      paymentMethod: sale.paymentMethod,
      discount: sale.discount,
      observation: sale.observation,
    }));

    return reply.send(formatted);
  } catch (error) {
    console.error("Erro ao gerar relatório de vendas:", error);
    return reply.status(500).send({ error: 'Erro interno do servidor ao gerar relatório.' });
  }
};
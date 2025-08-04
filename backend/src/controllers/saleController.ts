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
        itemsCount: sale.itemsCount, // <-- CORRIGIDO: Agora usa a coluna do banco de dados
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

export const deleteSale = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };

  try {
    // Para deletar uma venda, você deve primeiro restaurar o estoque dos produtos
    // Isso é uma regra de negócio importante para a consistência dos dados
    // Vamos adicionar essa lógica aqui
    
    // 1. Encontre a venda e seus itens antes de deletar
    const saleToDelete = await prisma.sale.findUnique({
      where: { id },
      include: { items: true }
    });
    
    if (!saleToDelete) {
        return reply.status(404).send({ error: 'Venda não encontrada.' });
    }

    // 2. Aumente o estoque dos produtos que foram vendidos
    const transaction = await prisma.$transaction(async (tx) => {
        for (const item of saleToDelete.items) {
            await tx.product.update({
                where: { id: item.productId },
                data: {
                    stock: {
                        increment: item.quantity, // Adiciona a quantidade de volta ao estoque
                    },
                },
            });
        }
        
        // 3. Delete os SaleItems associados à venda
        await tx.saleItem.deleteMany({
            where: { saleId: id },
        });

        // 4. Delete a venda principal
        await tx.sale.delete({
            where: { id },
        });

        return true;
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
      itemsCount: sale.itemsCount, // <-- Incluído na resposta detalhada
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
import { FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../lib/prisma';

export const getAllCategories = async (request: FastifyRequest, reply: FastifyReply) => {
  const categories = await prisma.category.findMany({
    include: {
      products: true,
    },
  });
  return reply.send(categories);
};

export const createCategory = async (request: FastifyRequest, reply: FastifyReply) => {
  const { name } = request.body as { name: string };

  if (!name) {
    return reply.status(400).send({ error: 'Nome da categoria é obrigatório.' });
  }

  const newCategory = await prisma.category.create({
    data: { name },
  });

  return reply.status(201).send(newCategory);
};

export const updateCategory = async (
  request: FastifyRequest<{ Params: { id: string }; Body: { name: string } }>,
  reply: FastifyReply
) => {
  const { id } = request.params;
  const { name } = request.body;

  if (!name) {
    return reply.status(400).send({ error: 'Nome da categoria é obrigatório.' });
  }

  try {
    const updatedCategory = await prisma.category.update({
      where: { id },
      data: { name },
    });

    return reply.send(updatedCategory);
  } catch (error) {
    return reply.status(404).send({ error: 'Categoria não encontrada.' });
  }
};


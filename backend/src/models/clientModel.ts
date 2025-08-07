import { prisma } from '../lib/prisma';

export const findAllClients = async () => {
  return prisma.client.findMany();
};

export const findClientById = async (id: string) => {
  return prisma.client.findUnique({ where: { id } });
};

export const createNewClient = async (clientData: {
  name: string;
  email: string;
  phone?: string;
  address?: string;
}) => {
  return prisma.client.create({
    data: clientData,
  });
};

export const updateExistingClient = async (
  id: string,
  clientData: {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
  }
) => {
  return prisma.client.update({
    where: { id },
    data: clientData,
  });
};

export const deleteExistingClient = async (id: string) => {
  return prisma.client.delete({
    where: { id },
  });
};

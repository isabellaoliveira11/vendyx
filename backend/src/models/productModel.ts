
// Arquivo: backend/src/models/productModel.ts
// Este arquivo agora contém toda a lógica de acesso ao banco de dados para produtos.
import { prisma } from '../lib/prisma';

// Função para buscar todos os produtos
export const findAllProducts = async () => {
    return prisma.product.findMany({
        include: {
            category: true,
        },
    });
};

// Função para criar um novo produto
export const createNewProduct = async (productData: {
    name: string;
    price: number;
    stock: number;
    categoryId: string;
}) => {
    return prisma.product.create({
        data: productData,
    });
};

// Função para atualizar um produto existente
export const updateExistingProduct = async (id: string, productData: {
    name?: string;
    price?: number;
    stock?: number;
    categoryId?: string;
}) => {
    return prisma.product.update({
        where: { id },
        data: productData,
    });
};

// Função para deletar um produto
export const deleteExistingProduct = async (id: string) => {
    return prisma.product.delete({
        where: { id },
    });
};

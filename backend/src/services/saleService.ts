// src/services/saleService.ts
import { prisma } from '../lib/prisma';

// Tipagem para um item individual da venda recebido pelo serviço
type SaleItemInput = {
  productId: string;
  quantity: number;
  price: number; // Preço unitário do produto no momento da venda
};

// Tipagem para os dados completos de criação de venda recebidos pelo serviço
type CreateSaleInput = {
  clientName: string;
  items: SaleItemInput[];
  // Adicione aqui se você estiver passando paymentMethod, discount, observation do frontend para o serviço
  paymentMethod?: string;
  discount?: number;
  observation?: string;
};

/**
 * Cria uma nova venda e atualiza o estoque dos produtos envolvidos.
 * Utiliza uma transação para garantir que, se qualquer parte da operação falhar,
 * tudo seja revertido (rollback), mantendo a consistência dos dados.
 */
export async function createSaleService(data: CreateSaleInput) {
  const { clientName, items, paymentMethod, discount, observation } = data;

  // 1. Calcular o total da venda com base nos itens
  const totalCalculated = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // 2. Aplicar o desconto ao total, se um valor de desconto for fornecido
  const finalTotal = totalCalculated - (discount || 0);

  // 3. Contar o número total de itens (quantidades somadas)
  const itemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  // 4. Iniciar uma transação para garantir atomicidade das operações
  // Se a criação da venda ou a atualização de estoque falhar, tudo é desfeito (rollback).
  const result = await prisma.$transaction(async (tx) => {
    // 4.1. Criar a venda principal no banco de dados
    const sale = await tx.sale.create({
      data: {
        clientName,
        total: finalTotal, // Usar o total final calculado
        itemsCount: itemsCount, // Usar a contagem total de itens
        paymentMethod: paymentMethod || 'Dinheiro', // Define um valor padrão
        discount: discount || 0, // Define um valor padrão
        observation: observation || '', // Define um valor padrão
        // Conectar os itens da venda, criando-os na tabela 'SaleItem'
        items: { // IMPORTANTE: O nome desta propriedade ('items') deve corresponder à sua relação no `schema.prisma`
          create: items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price, // Salva o preço unitário do item no momento da venda
          })),
        },
      },
      // Inclui os itens da venda na resposta para facilitar o frontend, se necessário
      include: {
        items: true,
      },
    });

    // 4.2. Iterar sobre cada item vendido para ATUALIZAR O ESTOQUE
    for (const item of items) {
      // Busca o produto para verificar o estoque atual
      const product = await tx.product.findUnique({
        where: { id: item.productId },
        select: { stock: true, name: true } // Seleciona apenas o estoque e o nome para feedback
      });

      // Verifica se o produto existe
      if (!product) {
        // Lança um erro que fará a transação ser revertida
        throw new Error(`Produto com ID ${item.productId} não encontrado.`);
      }

      // Verifica se há estoque suficiente para a quantidade vendida
      if (product.stock < item.quantity) {
        // Lança um erro com mensagem específica de estoque insuficiente
        throw new Error(`Estoque insuficiente para o produto "${product.name}". Disponível: ${product.stock}, Solicitado: ${item.quantity}.`);
      }

      // Decrementa o estoque do produto no banco de dados
      await tx.product.update({
        where: { id: item.productId },
        data: {
          stock: {
            decrement: item.quantity, // Diminui o estoque pela quantidade vendida
          },
        },
      });
    }

    // Se todas as operações (criação da venda e atualizações de estoque) forem bem-sucedidas,
    // a transação é commitada e a nova venda é retornada.
    return sale;
  });

  return result; // Retorna o resultado da transação
}
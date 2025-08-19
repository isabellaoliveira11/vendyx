// src/services/saleService.ts
import { prisma } from '../lib/prisma';

// -> MUDANÇA: Tipagem para um item individual da venda (sem alterações aqui)
type SaleItemInput = {
  productId: string;
  quantity: number;
  price: number;
};

// -> MUDANÇA: Alteramos o tipo de entrada para receber o ID do cliente
type CreateSaleInput = {
  clientId?: string; // MUDOU DE clientName: string para clientId?: string (opcional)
  items: SaleItemInput[];
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
  // -> MUDANÇA: Usamos clientId em vez de clientName
  const { clientId, items, paymentMethod, discount, observation } = data;

  // 1. Calcular o total da venda com base nos itens
  const totalCalculated = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // 2. Aplicar o desconto ao total, se um valor de desconto for fornecido
  const finalTotal = totalCalculated - (discount || 0);

  // 3. Contar o número total de itens (quantidades somadas)
  const itemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  // 4. Iniciar uma transação para garantir atomicidade das operações
  const result = await prisma.$transaction(async (tx) => {
    // 4.1. Criar a venda principal no banco de dados
    const sale = await tx.sale.create({
      data: {
        // -> MUDANÇA: Passamos o ID do cliente diretamente
        clientId: clientId, // MUDOU DE clientName para clientId
        total: finalTotal,
        itemsCount: itemsCount,
        paymentMethod: paymentMethod || 'Dinheiro',
        discount: discount || 0,
        observation: observation || '',
        // Conectar os itens da venda, criando-os na tabela 'SaleItem'
        items: {
          create: items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      // Inclui os itens da venda na resposta para facilitar o frontend
      include: {
        items: true,
      },
    });

    // 4.2. Iterar sobre cada item vendido para ATUALIZAR O ESTOQUE
    for (const item of items) {
      const product = await tx.product.findUnique({
        where: { id: item.productId },
        select: { stock: true, name: true }
      });

      if (!product) {
        throw new Error(`Produto com ID ${item.productId} não encontrado.`);
      }

      if (product.stock < item.quantity) {
        throw new Error(`Estoque insuficiente para o produto "${product.name}". Disponível: ${product.stock}, Solicitado: ${item.quantity}.`);
      }

      await tx.product.update({
        where: { id: item.productId },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      });
    }

    return sale;
  });

  return result;
}

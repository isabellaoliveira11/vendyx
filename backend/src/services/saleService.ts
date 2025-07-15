import { prisma } from '../lib/prisma'

type SaleItemInput = {
  productId: string
  quantity: number
  price: number
}

type CreateSaleInput = {
  clientName: string
  items: SaleItemInput[]
}

export async function createSaleService(data: CreateSaleInput) {
  const { clientName, items } = data

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const sale = await prisma.sale.create({
    data: {
      clientName,
      total,
      items: {
        create: items.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        }))
      }
    },
    include: {
      items: true,
    }
  })

  return sale
}

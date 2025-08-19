// Arquivo atualizado: backend/src/routes/saleRoutes.ts

import { FastifyInstance } from 'fastify'
// 1. Importe a nova função aqui 👇
import { createSale, getSales, getSalesReport } from '../controllers/saleController' 
import { deleteSale } from '../controllers/saleController'
import { getSaleById } from '../controllers/saleController'


export async function saleRoutes(app: FastifyInstance) {
  app.post('/sales', createSale)
  app.get('/sales', getSales)
  app.delete('/sales/:id', deleteSale)
  app.get('/sales/:id', getSaleById)

  // 2. Adicione a nova rota do relatório aqui 👇
  app.get('/sales/report', getSalesReport)
}
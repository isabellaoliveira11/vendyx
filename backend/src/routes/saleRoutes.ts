import { FastifyInstance } from 'fastify'
import { createSale, getSales } from '../controllers/saleController'
import { deleteSale } from '../controllers/saleController'
import { getSaleById } from '../controllers/saleController'


export async function saleRoutes(app: FastifyInstance) {
  app.post('/sales', createSale)
  app.get('/sales', getSales)
  app.delete('/sales/:id', deleteSale)
  app.get('/sales/:id', getSaleById)

}




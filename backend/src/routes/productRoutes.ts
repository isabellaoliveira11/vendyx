import { FastifyInstance } from 'fastify'
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController'

export async function productRoutes(app: FastifyInstance) {
  app.get('/products', getAllProducts)
  app.post('/products', createProduct)
  app.put('/products/:id', updateProduct)
  app.delete('/products/:id', deleteProduct)
}

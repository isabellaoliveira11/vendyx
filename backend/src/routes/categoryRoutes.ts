import { FastifyInstance } from 'fastify';
import { getAllCategories, createCategory } from '../controllers/categoryController';
import { updateCategory } from '../controllers/categoryController';

export async function categoryRoutes(app: FastifyInstance) {
  app.get('/categories', getAllCategories);
  app.post('/categories', createCategory);
  app.put('/categories/:id', updateCategory);

}



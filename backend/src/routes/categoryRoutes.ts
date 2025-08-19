import { FastifyInstance } from 'fastify';
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory
} from '../controllers/categoryController';

export async function categoryRoutes(app: FastifyInstance) {
  app.get('/categories', getAllCategories);
  app.post('/categories', createCategory);
  app.put('/categories/:id', updateCategory);
  app.delete('/categories/:id', deleteCategory); // ✅
}

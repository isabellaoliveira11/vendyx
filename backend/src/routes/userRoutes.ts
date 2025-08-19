import { FastifyInstance } from 'fastify'
import { registerUser, loginUser } from '../controllers/userController'

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', registerUser);
  app.post('/login', loginUser);
}
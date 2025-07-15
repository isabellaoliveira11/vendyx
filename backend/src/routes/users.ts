import { FastifyInstance } from 'fastify'
import { registerUser } from '../controllers/userController'

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', registerUser)
}

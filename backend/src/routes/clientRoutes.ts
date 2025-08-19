import { FastifyInstance } from 'fastify'
import {
  getAllClients,
  createClient,
  updateClient,
  deleteClient,
} from '../controllers/ClientController'

export async function clientRoutes(app: FastifyInstance) {
  app.get('/clients', getAllClients)
  app.post('/clients', createClient)
  app.put('/clients/:id', updateClient)
  app.delete('/clients/:id', deleteClient)
}

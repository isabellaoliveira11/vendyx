import Fastify from 'fastify'
import fastifyCors from '@fastify/cors'
import fastifyFormbody from '@fastify/formbody'
import { userRoutes } from './routes/userRoutes'
import { categoryRoutes } from './routes/categoryRoutes'
import { productRoutes } from './routes/productRoutes'
import { saleRoutes } from './routes/saleRoutes'
import { clientRoutes } from './routes/clientRoutes' // importação das rotas cliente

const app = Fastify()

await app.register(fastifyCors, {
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
})

app.register(fastifyFormbody)

app.register(userRoutes)
app.register(categoryRoutes)
app.register(productRoutes)
app.register(saleRoutes)
app.register(clientRoutes) // registro das rotas cliente

app.get('/', async () => {
  return { message: 'Backend Vendyx online! 💜' }
})

app.listen({ port: 3333 }, () => {
  console.log('🚀 Server running at http://localhost:3333')
})

import Fastify from 'fastify'
import fastifyCors from '@fastify/cors'
import fastifyFormbody from '@fastify/formbody'
import { userRoutes } from './routes/users'
import { categoryRoutes } from './routes/categoryRoutes'
import { productRoutes } from './routes/productRoutes'
import { saleRoutes } from './routes/saleRoutes'

const app = Fastify()

// Habilita CORS para permitir requisições do front-end, incluindo DELETE
await app.register(fastifyCors, {
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // <<< importante incluir DELETE
})

app.register(fastifyFormbody)
app.register(userRoutes)
app.register(categoryRoutes)
app.register(productRoutes)
app.register(saleRoutes)

app.get('/', async () => {
  return { message: 'Backend Vendyx online! 💜' }
})

app.post('/login', async (request, reply) => {
  const { email, password } = request.body as { email: string; password: string }

  if (email === 'admin@vendyx.com' && password === '123456') {
    return reply.send({ message: 'Login successful', token: 'fake-jwt-token' })
  } else {
    return reply.status(401).send({ error: 'Email or password is incorrect' })
  }
})

app.listen({ port: 3333 }, () => {
  console.log('🚀 Server running at http://localhost:3333')
})

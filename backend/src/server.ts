import Fastify from 'fastify'
import fastifyCors from '@fastify/cors'
import fastifyFormbody from '@fastify/formbody'
import { userRoutes } from './routes/userRoutes' // Nome do arquivo corrigido
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

// A rota de login duplicada foi removida.
// A rota de login agora será tratada pela função loginUser do seu controller,
// que foi registrada no userRoutes.

app.listen({ port: 3333 }, () => {
  console.log('🚀 Server running at http://localhost:3333')
})

import Fastify from 'fastify'
import fastifyCors from '@fastify/cors'
import fastifyFormbody from '@fastify/formbody'
import { userRoutes } from './routes/userRoutes'
import { categoryRoutes } from './routes/categoryRoutes'
import { productRoutes } from './routes/productRoutes'
import { saleRoutes } from './routes/saleRoutes'
import { clientRoutes } from './routes/clientRoutes'

const app = Fastify()

await app.register(fastifyCors, {
  origin: [
    'http://localhost:5173',
    'https://vendyx.vercel.app' // Frontend em produção
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
})

app.register(fastifyFormbody)

app.register(userRoutes)
app.register(categoryRoutes)
app.register(productRoutes)
app.register(saleRoutes)
app.register(clientRoutes)

app.get('/', async () => {
  return { message: 'Backend Vendyx online! 💜' }
})

const PORT = Number(process.env.PORT) || 3333

app
  .listen({ port: PORT, host: '0.0.0.0' })
  .then(() => {
    console.log(`🚀 Server running at http://localhost:${PORT}`)
  })
  .catch(err => {
    console.error('❌ Error starting server:', err)
    process.exit(1)
  })

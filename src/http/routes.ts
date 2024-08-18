import { type FastifyInstance } from 'fastify'
import { handleRegister } from './controllers/register'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', handleRegister)
}

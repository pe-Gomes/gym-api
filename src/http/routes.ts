import { type FastifyInstance } from 'fastify'
import { handleRegister } from './controllers/register'
import { handleAuthentication } from './controllers/authentication'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', handleRegister)

  app.post('/sessions', handleAuthentication)
}

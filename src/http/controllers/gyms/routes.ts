import { type FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { handleRegisterGym } from './register-gym'
import { handleSearch } from './search'
import { handleNearby } from './nearby'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/gyms', handleRegisterGym)

  app.get('/gyms/search', handleSearch)
  app.get('/gyms/nearby', handleNearby)
}

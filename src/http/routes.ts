import { type FastifyInstance } from 'fastify'
import { handleRegister } from './controllers/register'
import { handleAuthentication } from './controllers/authentication'
import { handleGetUserProfile } from './controllers/get-user-profile'
import { handleCheckIn } from './controllers/check-in'
import { handleRegisterGym } from './controllers/register-gym'
import { verifyJWT } from './middlewares/verify-jwt'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', handleRegister)

  app.post('/sessions', handleAuthentication)
  app.get(
    '/me',
    {
      onRequest: [verifyJWT],
    },
    handleGetUserProfile
  )

  app.post('/check-in', handleCheckIn)
  app.post('/gyms', handleRegisterGym)
}

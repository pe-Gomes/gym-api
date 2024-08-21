import { type FastifyInstance } from 'fastify'
import { handleRegister } from './controllers/register'
import { handleAuthentication } from './controllers/authentication'
import { handleGetUserProfile } from './controllers/get-user-profile'
import { handleCheckIn } from './controllers/check-in'
import { handleRegisterGym } from './controllers/register-gym'
import { verifyJWT } from './middlewares/verify-jwt'
import { handleGetUserCheckIns } from './controllers/get-user-check-ins'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', handleRegister)
  app.get('/users/:userId/check-in', handleGetUserCheckIns)

  app.post('/sessions', handleAuthentication)

  app.get(
    '/me',
    {
      onRequest: [verifyJWT],
    },
    handleGetUserProfile
  )

  app.post(
    '/check-in',
    {
      onRequest: [verifyJWT],
    },
    handleCheckIn
  )

  app.post(
    '/gyms',
    {
      onRequest: [verifyJWT],
    },
    handleRegisterGym
  )
}

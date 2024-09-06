import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { handleAuthentication } from './authentication'
import { handleGetUserProfile } from './get-user-profile'
import { handleRegister } from './register'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', handleRegister)

  app.post('/sessions', handleAuthentication)

  app.get(
    '/me',
    {
      onRequest: [verifyJWT],
    },
    handleGetUserProfile
  )
}

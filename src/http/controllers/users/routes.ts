import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { handleAuthentication } from './authentication'
import { handleGetUserProfile } from './get-user-profile'
import { handleRegister } from './register'
import { handleRefreshToken } from './refresh-token'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', handleRegister)

  app.post('/sessions', handleAuthentication)

  app.patch('/token/refresh', handleRefreshToken)

  app.get(
    '/me',
    {
      onRequest: [verifyJWT],
    },
    handleGetUserProfile
  )
}

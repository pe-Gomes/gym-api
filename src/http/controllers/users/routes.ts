import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { handleGetUserMetrics } from '../get-user-metrics'
import { handleAuthentication } from './authentication'
import { handleGetUserProfile } from './get-user-profile'
import { handleRegister } from './register'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', handleRegister)
  app.get(
    '/users/:userId/check-in/metrics',
    {
      onRequest: [verifyJWT],
    },
    handleGetUserMetrics
  )

  app.post('/sessions', handleAuthentication)

  app.get(
    '/me',
    {
      onRequest: [verifyJWT],
    },
    handleGetUserProfile
  )
}

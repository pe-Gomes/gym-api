import { type FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { handleCreate } from './create'
import { handleHistory } from './history'
import { handleMetrics } from './metrics'
import { handleValidate } from './validate'
import { verifyTargetRole } from '@/http/middlewares/verify-target-role'

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/gyms/:gymId/check-ins', handleCreate)

  app.get('/check-ins/history', handleHistory)
  app.get('/check-ins/metrics', handleMetrics)

  app.patch(
    '/check-ins/:checkInId/validate',
    { onRequest: verifyTargetRole('ADMIN') },
    handleValidate
  )
}

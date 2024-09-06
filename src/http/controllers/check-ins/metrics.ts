import { makeGetUserMetricsUseCase } from '@/use-cases/factories/make-get-user-metrics-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function handleMetrics(req: FastifyRequest, res: FastifyReply) {
  const userCase = makeGetUserMetricsUseCase()

  const { checkInsCount } = await userCase.execute({ userId: req.user.sub })

  res.status(200).send({ checkInsCount })
}

import { makeGetUserMetricsUseCase } from '@/use-cases/factories/make-get-user-metrics-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function handleGetUserMetrics(
  req: FastifyRequest,
  res: FastifyReply
) {
  const { userId } = z
    .object({
      userId: z.string(),
    })
    .parse(req.params)

  const userCase = makeGetUserMetricsUseCase()

  const { checkInsCount } = await userCase.execute({ userId })

  res.status(200).send({ checkInsCount })
}

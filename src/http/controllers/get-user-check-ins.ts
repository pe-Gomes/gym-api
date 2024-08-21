import { makeGetUserCheckInsUseCase } from '@/use-cases/factories/make-get-user-check-ins-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function handleGetUserCheckIns(
  req: FastifyRequest,
  res: FastifyReply
) {
  const paramsSchema = z.object({
    userId: z.string(),
  })

  const queryParams = z.object({
    page: z.coerce.number().optional(),
    limit: z.coerce.number().optional(),
  })

  const { userId } = paramsSchema.parse(req.params)
  const { page, limit } = queryParams.parse(req.query)

  const useCase = makeGetUserCheckInsUseCase()

  const { checkIns } = await useCase.execute({ userId, page, limit })

  res.status(200).send(checkIns)
}

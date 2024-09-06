import { makeGetUserCheckInsUseCase } from '@/use-cases/factories/make-get-user-check-ins-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function handleHistory(req: FastifyRequest, res: FastifyReply) {
  const queryParams = z.object({
    page: z.coerce.number().optional(),
    limit: z.coerce.number().optional(),
  })

  const { page, limit } = queryParams.parse(req.query)

  const useCase = makeGetUserCheckInsUseCase()

  const { checkIns } = await useCase.execute({
    userId: req.user.sub,
    page,
    limit,
  })

  res.status(200).send({ checkIns })
}

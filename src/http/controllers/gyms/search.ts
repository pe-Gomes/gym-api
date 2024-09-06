import { makeSearchGymsUseCase } from '@/use-cases/factories/make-search-gyms-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function handleSearch(req: FastifyRequest, res: FastifyReply) {
  const searchGymsQuerySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { q, page } = searchGymsQuerySchema.parse(req.query)

  const useCase = makeSearchGymsUseCase()

  const { gyms } = await useCase.execute({ query: q, page })

  return res.status(200).send({ gyms })
}

import { makeValidateCheckInUseCase } from '@/use-cases/factories/make-validate-check-in-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function handleValidate(req: FastifyRequest, res: FastifyReply) {
  const paramSchema = z.object({
    checkInId: z.string(),
  })

  const { checkInId } = paramSchema.parse(req.params)

  const validateUseCase = makeValidateCheckInUseCase()

  await validateUseCase.execute({ checkInId })

  return await res.status(204).send()
}

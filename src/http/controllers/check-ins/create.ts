import {
  MaxCheckInsReachedError,
  MismatchLocationError,
  NotFoundError,
} from '@/use-cases/errors'
import { makeCheckInUseCase } from '@/use-cases/factories/make-check-in-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function handleCreate(req: FastifyRequest, res: FastifyReply) {
  const createCheckInParamSchema = z.object({
    gymId: z.string(),
  })

  const createCheckInSchema = z.object({
    userLatitude: z.number(),
    userLongitude: z.number(),
  })

  const { gymId } = createCheckInParamSchema.parse(req.params)

  const { userLatitude, userLongitude } = createCheckInSchema.parse(req.body)

  try {
    const checkInUseCase = makeCheckInUseCase()

    await checkInUseCase.execute({
      userId: req.user.sub,
      gymId,
      userLatitude,
      userLongitude,
    })
  } catch (err) {
    if (
      err instanceof MismatchLocationError ||
      err instanceof NotFoundError ||
      err instanceof MaxCheckInsReachedError
    ) {
      return res.status(400).send({ message: err.message })
    }

    throw err
  }

  return res.status(201).send()
}

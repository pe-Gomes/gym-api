import {
  MaxCheckInsReachedError,
  MismatchLocationError,
  NotFoundError,
} from '@/use-cases/errors'
import { makeCheckInUseCase } from '@/use-cases/factories/make-check-in-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function handleCheckIn(req: FastifyRequest, res: FastifyReply) {
  // Ensure authenticated
  await req.jwtVerify()

  const createCheckInSchema = z.object({
    userId: z.string(),
    gymId: z.string(),
    userLatitude: z.number(),
    userLongitude: z.number(),
  })

  const { userId, gymId, userLatitude, userLongitude } =
    createCheckInSchema.parse(req.body)

  try {
    const checkInUseCase = makeCheckInUseCase()

    await checkInUseCase.execute({
      userId,
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

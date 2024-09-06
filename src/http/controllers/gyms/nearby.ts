import { makeFetchNearbyGymsUseCase } from '@/use-cases/factories/make-fetch-nearby-gyms-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function handleNearby(req: FastifyRequest, res: FastifyReply) {
  const nearbySearchParams = z.object({
    latitude: z.coerce.number(),
    longitude: z.coerce.number(),
  })

  const { longitude, latitude } = nearbySearchParams.parse(req.query)

  const useCase = makeFetchNearbyGymsUseCase()

  const { gyms } = await useCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return res.status(200).send({ gyms })
}

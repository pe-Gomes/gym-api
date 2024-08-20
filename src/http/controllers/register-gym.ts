import { makeRegisterGymUseCase } from '@/use-cases/factories/make-register-gym-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function handleRegisterGym(
  req: FastifyRequest,
  res: FastifyReply
) {
  // Ensure authenticated
  // try
  try {
    await req.jwtVerify()

    const registerGymSchema = z.object({
      title: z.string(),
      description: z.string().optional(),
      phone: z.string().optional(),
      latitude: z.number(),
      longitude: z.number(),
    })

    const body = registerGymSchema.parse(req.body)

    const registerGymUseCase = makeRegisterGymUseCase()
    await registerGymUseCase.execute({
      ...body,
      description: body.description || null,
      phone: body.phone || null,
    })

    res.status(201).send()
  } catch (error) {
    console.log(error)
    res.status(400).send()
  }
}

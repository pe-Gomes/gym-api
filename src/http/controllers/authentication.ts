import { PrismaUsersRepository } from '@/repositories/prisma-user-repository'
import { AuthenticationUseCase } from '@/use-cases/authentication'
import { UnauthorizedError } from '@/use-cases/errors'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function handleAuthentication(
  req: FastifyRequest,
  res: FastifyReply
) {
  const authenticationBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const data = authenticationBodySchema.parse(req.body)

  try {
    const userRepository = new PrismaUsersRepository()
    const authenticationUseCase = new AuthenticationUseCase(userRepository)

    await authenticationUseCase.execute(data)
  } catch (err) {
    if (err instanceof UnauthorizedError) {
      return res.status(400).send({ message: err.message })
    }

    throw err
  }

  return res.status(201).send()
}

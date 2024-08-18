import { PrismaUsersRepository } from '@/repositories/prisma-user-repository'
import { RegisterUseCase } from '@/use-cases/register'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function handleRegister(req: FastifyRequest, res: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(req.body)

  try {
    const prismaUserRepository = new PrismaUsersRepository()
    const registerUseCase = new RegisterUseCase(prismaUserRepository)

    await registerUseCase.execute({ name, email, password })
  } catch {
    return res.status(409).send()
  }

  res.status(201).send()
}

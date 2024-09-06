import { UnauthorizedError } from '@/use-cases/errors'
import { makeAuthenticationUseCase } from '@/use-cases/factories/make-authentication-use-case'
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
    const authenticationUseCase = makeAuthenticationUseCase()

    const { user } = await authenticationUseCase.execute(data)

    const token = await res.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      }
    )

    const refreshToken = await res.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
          expiresIn: '7d',
        },
      }
    )

    return res
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(201)
      .send({ token })
  } catch (err) {
    if (err instanceof UnauthorizedError) {
      return res.status(400).send({ message: err.message })
    }

    throw err
  }
}

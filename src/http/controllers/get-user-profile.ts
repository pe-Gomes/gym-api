import { NotFoundError } from '@/use-cases/errors'
import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-get-user-profile-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function handleGetUserProfile(
  req: FastifyRequest,
  res: FastifyReply
) {
  try {
    const getUserProfileUseCase = makeGetUserProfileUseCase()

    const { user } = await getUserProfileUseCase.execute({
      userId: req.user.sub,
    })

    return res.status(200).send({
      ...user,
      passwordHash: undefined,
    })
  } catch (err) {
    if (err instanceof NotFoundError) {
      return res.status(401).send({ message: err.message })
    }

    throw err
  }
}

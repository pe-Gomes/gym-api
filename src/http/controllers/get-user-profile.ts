import { NotFoundError } from '@/use-cases/errors'
import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-get-user-profile-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function handleGetUserProfile(
  req: FastifyRequest,
  res: FastifyReply
) {
  await req.jwtVerify().catch((err) => console.log(err))

  try {
    const getUserProfileUseCase = makeGetUserProfileUseCase()

    const { user } = await getUserProfileUseCase.execute({
      userId: req.user.sub,
    })

    return res.status(200).send({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    })
  } catch (err) {
    console.log(err)
    if (err instanceof NotFoundError) {
      return res.status(401).send({ message: err.message })
    }

    throw err
  }
}

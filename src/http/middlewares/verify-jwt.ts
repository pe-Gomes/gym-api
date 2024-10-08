import { FastifyRequest, FastifyReply } from 'fastify'

export async function verifyJWT(req: FastifyRequest, res: FastifyReply) {
  try {
    await req.jwtVerify()
  } catch {
    res.status(401).send({ message: 'Unauthorized' })
  }
}

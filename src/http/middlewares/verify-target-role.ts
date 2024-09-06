import { FastifyReply, FastifyRequest } from 'fastify'

export function verifyTargetRole(roleToVerify: 'ADMIN' | 'MEMBER') {
  return async function ensureAdmin(req: FastifyRequest, res: FastifyReply) {
    const { role } = req.user

    if (role !== roleToVerify) {
      return await res.status(403).send({ message: 'Forbidden' })
    }
  }
}

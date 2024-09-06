import { db } from '@/infra/db'
import { hashPassword } from '../utils'
import request from 'supertest'
import type { FastifyInstance } from 'fastify'

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false
) {
  await db.user.create({
    data: {
      name: 'John Doe',
      email: 'john@acme.com',
      passwordHash: await hashPassword('123456'),
      role: isAdmin ? 'ADMIN' : 'MEMBER',
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'john@acme.com',
    password: '123456',
  })

  const { token } = authResponse.body as { token: string }

  return {
    token,
  }
}

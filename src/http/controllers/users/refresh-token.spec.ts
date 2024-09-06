import request from 'supertest'
import { app } from '@/app'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { faker } from '@faker-js/faker'

describe('Refresh Token (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh token', async () => {
    await request(app.server).post('/users').send({
      name: faker.person.fullName(),
      email: 'email@test.com',
      password: '123456',
    })

    const authRes = await request(app.server).post('/sessions').send({
      password: '123456',
      email: 'email@test.com',
    })

    const cookies = authRes.get('Set-Cookie')

    if (!cookies) {
      return
    }

    const res = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)

    expect(res.status).toBe(201)
    expect(res.body).toEqual({ token: expect.any(String) })
    expect(res.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})

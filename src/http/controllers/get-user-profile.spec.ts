import request from 'supertest'
import { app } from '@/app'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { faker } from '@faker-js/faker'

describe('Get User Profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register', async () => {
    await request(app.server).post('/users').send({
      name: faker.person.fullName(),
      email: 'email@test.com',
      password: '123456',
    })

    const res = await request(app.server).post('/sessions').send({
      password: '123456',
      email: 'email@test.com',
    })

    const { token } = res.body as { token: string }

    const profile = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)

    expect(profile.status).toBe(200)
    expect(profile.body).toEqual(
      expect.objectContaining({ email: 'email@test.com' })
    )
  })
})

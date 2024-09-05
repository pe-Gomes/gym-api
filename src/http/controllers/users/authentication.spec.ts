import request from 'supertest'
import { app } from '@/app'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { faker } from '@faker-js/faker'

describe('Session Authentication (e2e)', () => {
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

    expect(res.status).toBe(201)
    expect(res.body).toEqual({ token: expect.any(String) })
  })
})

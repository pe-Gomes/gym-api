import request from 'supertest'
import { app } from '@/app'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { faker } from '@faker-js/faker'
import { createAndAuthenticateUser } from '@/lib/test/create-and-authenticate-user'

describe('Register a Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register a gym', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    const res = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: faker.company.name(),
        phone: faker.phone.number(),
        description: faker.lorem.paragraph(),
        latitude: faker.location.latitude(),
        longitude: faker.location.longitude(),
      })

    expect(res.status).toBe(201)
  })
})

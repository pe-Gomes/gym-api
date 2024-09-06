import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { db } from '@/infra/db'
import request from 'supertest'
import { createAndAuthenticateUser } from '@/lib/test/create-and-authenticate-user'

describe('Create Check-in (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a check-in', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const gym = await db.gym.create({
      data: {
        title: 'Gym',
        latitude: -27.2092052,
        longitude: -49.6401091,
      },
    })

    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        userLatitude: -27.2092052,
        userLongitude: -49.6401091,
      })

    expect(response.statusCode).toEqual(201)
  })
})

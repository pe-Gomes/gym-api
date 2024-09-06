import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { db } from '@/infra/db'
import request from 'supertest'
import { createAndAuthenticateUser } from '@/lib/test/create-and-authenticate-user'

describe('Nearby Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able get nearby gyms', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await db.gym.createMany({
      data: [
        {
          title: 'Gym',
          latitude: -27.2092052,
          longitude: -49.6401091,
        },
        {
          title: 'Gym',
          latitude: -27.2092052,
          longitude: -49.6401091,
        },
      ],
    })

    const response = await request(app.server)
      .get('/gyms/nearby?latitude=-27.2092052&longitude=-49.6401091')
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(2)
  })
})

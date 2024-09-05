import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { describe, it, beforeEach, expect } from 'vitest'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let useCase: FetchNearbyGymsUseCase
let gymsCreated: number

const BASE_LOCATION = {
  latitude: -15.6081661,
  longitude: -56.0807557,
}

describe('Fetch Nearby Gyms Use Case Tests', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    useCase = new FetchNearbyGymsUseCase(gymsRepository)

    gymsCreated = 5

    for (let i = 0; i < gymsCreated; i++) {
      await gymsRepository.create({
        title: `Gym ${i + 1}`,
        phone: '123456789',
        ...BASE_LOCATION,
      })
    }
  })

  it('should return nearby gyms within the user location', async () => {
    const { gyms } = await useCase.execute({
      userLatitude: BASE_LOCATION.latitude,
      userLongitude: BASE_LOCATION.longitude,
    })

    expect(gyms.length).toBe(gymsCreated)
  })

  it('should NOT return gyms that are NOT within the user location', async () => {
    const { gyms } = await useCase.execute({
      userLatitude: BASE_LOCATION.latitude + 15,
      userLongitude: BASE_LOCATION.longitude + 15,
    })

    expect(gyms.length).not.toBe(gymsCreated)
  })
})

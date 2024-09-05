import { beforeEach, describe, expect, it } from 'vitest'
import { SearchGymsUseCase } from './search-gyms'
import { GymsRepository } from '@/repositories/gyms-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

let useCase: SearchGymsUseCase
let gymsRepository: GymsRepository
let gymsCreated: number
let itemsPerPage: number

describe('Search Gyms Use Case (always 20 items per page)', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    useCase = new SearchGymsUseCase(gymsRepository)

    gymsCreated = 50
    itemsPerPage = 20
    // Creating 50 Gyms
    for (let i = 0; i < gymsCreated; i++) {
      await gymsRepository.create({
        title: `Gym ${i + 1}`,
        phone: '123456789',
        latitude: -2 * i,
        longitude: -10 * i,
      })
    }
  })

  it('should return the user check ins with a full pagination', async () => {
    const { gyms } = await useCase.execute({ page: 1, query: 'Gym' })

    const ratio = gymsCreated / 20

    if (ratio > 1) {
      expect(gyms.length).toBe(itemsPerPage)
    } else {
      expect(gyms.length).toBe(gymsCreated)
    }
  })

  it('should return a partial pagination', async () => {
    const { gyms } = await useCase.execute({ page: 3, query: 'Gym' })

    const ratio = gymsCreated / 20

    if (ratio > 3) {
      expect(gyms.length).toBe(itemsPerPage)
      return
    }

    if (ratio > 2 && ratio < 3) {
      expect(gyms.length).toBe(10)
      return
    }

    expect(gyms.length).toBe(0)
  })

  it('should return empty when the page overflows the number of gyms', async () => {
    const { gyms } = await useCase.execute({ page: 1, query: 'Gym 10' })
    expect(gyms.length).toBe(1)
  })
})

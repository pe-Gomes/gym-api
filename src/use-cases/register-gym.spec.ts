import { GymsRepository } from '@/repositories/gyms-repository'
import { RegisterGymUseCase } from './register-gym'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

let gymRepository: GymsRepository
let useCase: RegisterGymUseCase

describe('Test Register Gym Use Case', () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymsRepository()
    useCase = new RegisterGymUseCase(gymRepository)
  })

  it('should register a gym', async () => {
    const { gym } = await useCase.execute({
      title: 'Academia do Zé',
      description: null,
      phone: null,
      longitude: 0,
      latitude: 0,
    })

    expect(gym.id).toBeDefined()
    expect(gym.title).toBe('Academia do Zé')
    expect(gym.description).toBeNull()
    expect(gym.phone).toBeNull()
    expect(gym.longitude).toBeDefined()
    expect(gym.latitude).toBeDefined()
  })
})

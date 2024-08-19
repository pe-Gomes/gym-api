import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CheckInUseCase } from './check-in'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'

let checkInRepository: CheckInsRepository
let checkInUseCase: CheckInUseCase

describe('Test Check In Use Case', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository()
    checkInUseCase = new CheckInUseCase(checkInRepository)
  })

  it('should check in a user to a gym', async () => {
    const userId = '123'
    const gymId = '456'

    const { checkIn } = await checkInUseCase.execute({ userId, gymId })

    expect(checkIn).toBeDefined()
    expect(checkIn.userId).toBe(userId)
    expect(checkIn.gymId).toBe(gymId)
  })
})

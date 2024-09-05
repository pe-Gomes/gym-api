import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { ValidateCheckInUseCase } from './validate-check-in'
import { NotFoundError } from './errors'

let checkInsRepository: InMemoryCheckInsRepository
let useCase: ValidateCheckInUseCase

describe('Validate Check-in Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    useCase = new ValidateCheckInUseCase(checkInsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to validate the check-in', async () => {
    const createdCheckIn = await checkInsRepository.create({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    const { checkIn } = await useCase.execute({
      checkInId: createdCheckIn.id,
    })

    expect(checkIn.validatedAt).toEqual(expect.any(Date))
    expect(checkInsRepository.checkIns[0].validatedAt).toEqual(expect.any(Date))
  })

  it('should not be able to validate an inexistent check-in', async () => {
    await expect(() =>
      useCase.execute({
        checkInId: 'inexistent-check-in-id',
      })
    ).rejects.toBeInstanceOf(NotFoundError)
  })

  it('should not be able to validate a check-in after 20 minutes of its creation', async () => {
    const date = new Date(2024, 1, 1, 18, 0, 0)
    vi.setSystemTime(date)

    const createdCheckIn = await checkInsRepository.create({
      gymId: 'gym-01',
      userId: 'user-01',
      createdAt: date,
    })

    vi.advanceTimersByTime(1000 * 60 * 21) // Advance 21 minutes in time

    expect(
      useCase.execute({ checkInId: createdCheckIn.id })
    ).rejects.toBeInstanceOf(Error)
  })
})

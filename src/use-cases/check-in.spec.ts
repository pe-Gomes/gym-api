import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CheckInUseCase } from './check-in'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { GymsRepository } from '@/repositories/gyms-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { MaxCheckInsReachedError, MismatchLocationError } from './errors'

let checkInRepository: CheckInsRepository
let gymsRepository: GymsRepository
let checkInUseCase: CheckInUseCase

describe('Test Check In Use Case', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    checkInUseCase = new CheckInUseCase(checkInRepository, gymsRepository)
  })

  it('should check in a user to a gym', async () => {
    const { id: gymId } = await gymsRepository.create({
      title: 'Gym 1',
      latitude: -15.6081661,
      longitude: -56.0807557,
    })

    const userId = '123'
    const userLatitude = -15.6081661
    const userLongitude = -56.0807557

    const { checkIn } = await checkInUseCase.execute({
      userId,
      gymId,
      userLatitude,
      userLongitude,
    })

    expect(checkIn).toBeDefined()
    expect(checkIn.userId).toBe(userId)
    expect(checkIn.gymId).toBe(gymId)
  })

  it('should NOT check in a user to a gym TWICE A DAY', async () => {
    const { id: gymId } = await gymsRepository.create({
      title: 'Gym 1',
      latitude: -15.6081661,
      longitude: -56.0807557,
    })

    const userId = '123'
    const userLatitude = -15.6081661
    const userLongitude = -56.0807557

    await checkInUseCase.execute({
      userId,
      gymId,
      userLatitude,
      userLongitude,
    })

    await expect(() =>
      checkInUseCase.execute({
        userId,
        gymId,
        userLatitude,
        userLongitude,
      })
    ).rejects.toBeInstanceOf(MaxCheckInsReachedError)
  })

  it('should NOT check in a user to a gym if the user is too far away', async () => {
    const { id: gymId } = await gymsRepository.create({
      title: 'Gym 1',
      latitude: -15.5971713,
      longitude: -56.0989088,
    })

    const userId = '123'
    const userLatitude = -15.6081661
    const userLongitude = -56.0807557
    await expect(() =>
      checkInUseCase.execute({
        userId,
        gymId,
        userLatitude,
        userLongitude: userLongitude,
      })
    ).rejects.toBeInstanceOf(MismatchLocationError)
  })
})

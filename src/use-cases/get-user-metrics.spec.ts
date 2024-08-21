import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetUserMetricsUseCase } from './get-user-metrics'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'

let repository: CheckInsRepository
let useCase: GetUserMetricsUseCase

describe('Get User Metrics Use Case', () => {
  beforeEach(() => {
    repository = new InMemoryCheckInsRepository()
    useCase = new GetUserMetricsUseCase(repository)
  })

  it('should return the number of check-ins for a user', async () => {
    const userId = 'user-id'
    const numberOfCheckIns = 5

    for (let i = 0; i < numberOfCheckIns; i++) {
      await repository.create({
        userId,
        gymId: 'gym-id',
      })
    }

    const { checkInsCount } = await useCase.execute({ userId })

    expect(checkInsCount).toBe(numberOfCheckIns)
  })
})

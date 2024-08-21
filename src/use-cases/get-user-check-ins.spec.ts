import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetUserCheckInsUseCase } from './get-user-check-ins'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'

let useCase: GetUserCheckInsUseCase
let checkInsRepository: CheckInsRepository
let userId: string

describe('List User Check Ins Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    useCase = new GetUserCheckInsUseCase(checkInsRepository)
    userId = 'user-id'

    // Creating 10 Check Ins for the same user
    for (let i = 0; i < 10; i++) {
      await checkInsRepository.create({
        userId,
        gymId: `gym-id-${i + 1}`,
      })
    }
  })

  it('should return the user check ins without pagination', async () => {
    const { checkIns } = await useCase.execute({ userId })

    expect(checkIns.length).toBe(10)
  })

  it('should return the user check ins with accurate pagination', async () => {
    const { checkIns } = await useCase.execute({
      userId,
      limit: 5,
      page: 2,
    })

    expect(checkIns.length).toBe(5)

    const { checkIns: checkIns2 } = await useCase.execute({
      userId,
      limit: 5,
      page: 1,
    })

    expect(checkIns2.length).toBe(5)

    for (let i = 0; i < checkIns.length; i++) {
      expect(checkIns2[i].id).not.toBe(checkIns[i].id)
    }
  })
})

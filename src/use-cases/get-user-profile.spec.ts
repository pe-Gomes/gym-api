import { UsersRepository } from '@/repositories/users-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetUserProfileUseCase } from './get-user-profile'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { faker } from '@faker-js/faker'
import { NotFoundError } from './errors'

let userRepository: UsersRepository
let getUserProfileUseCase: GetUserProfileUseCase

describe('Test Get User Profile Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    getUserProfileUseCase = new GetUserProfileUseCase(userRepository)
  })
  it('should return user profile with a valid id', async () => {
    const newUser = await userRepository.create({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      passwordHash: faker.internet.password(),
    })

    const { user } = await getUserProfileUseCase.execute({ userId: newUser.id })

    expect(user.id).toBeDefined()
    expect(user.name).toEqual(newUser.name)
    expect(user.email).toEqual(newUser.email)
  })
  it('should NOT return user profile with an invalid id', async () => {
    await expect(() =>
      getUserProfileUseCase.execute({
        userId: 'something-wrong',
      })
    ).rejects.toBeInstanceOf(NotFoundError)
  })
})

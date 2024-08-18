import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { faker } from '@faker-js/faker'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { ConflictError } from './errors'

let userRepository: InMemoryUsersRepository
let registerUseCase: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    registerUseCase = new RegisterUseCase(userRepository)
  })

  it('should create an user', async () => {
    const { user } = await registerUseCase.execute({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    })

    expect(user.id).toBeDefined()
  })

  it('should hash user password on registration', async () => {
    const password = faker.internet.password()

    const { user } = await registerUseCase.execute({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password,
    })

    expect(user.passwordHash).not.toBe(password)
  })

  it('should not allow registration with the same email', async () => {
    const email = faker.internet.email()

    await registerUseCase.execute({
      name: faker.person.fullName(),
      password: faker.internet.password(),
      email,
    })

    await expect(() =>
      registerUseCase.execute({
        name: faker.person.fullName(),
        password: faker.internet.password(),
        email,
      })
    ).rejects.toBeInstanceOf(ConflictError)
  })
})

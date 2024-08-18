import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register'
import { faker } from '@faker-js/faker'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { ConflictError } from './errors'

describe('Register Use Case', () => {
  it('should create an user', async () => {
    const userRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(userRepository)

    const { user } = await registerUseCase.execute({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    })

    expect(user.id).toBeDefined()
  })

  it('should hash user password on registration', async () => {
    const userRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(userRepository)

    const password = faker.internet.password()

    const { user } = await registerUseCase.execute({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password,
    })

    expect(user.passwordHash).not.toBe(password)
  })

  it('should not allow registration with the same email', async () => {
    const userRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(userRepository)

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

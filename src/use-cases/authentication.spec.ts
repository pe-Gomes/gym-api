import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticationUseCase } from './authentication'
import { faker } from '@faker-js/faker'
import { hashPassword } from '@/lib/utils'
import { UnauthorizedError } from './errors'

let userRepository: InMemoryUsersRepository
let authenticationUseCase: AuthenticationUseCase

describe('Authentication Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    authenticationUseCase = new AuthenticationUseCase(userRepository)
  })

  it('should authenticate a user', async () => {
    const email = faker.internet.email()
    const password = faker.internet.password()

    const passwordHash = await hashPassword(password)

    await userRepository.create({
      name: faker.person.fullName(),
      email,
      passwordHash,
    })

    const { user } = await authenticationUseCase.execute({ email, password })

    expect(user.id).toBeDefined()
    expect(user.name).toBeDefined()
    expect(user.passwordHash).toBeDefined()
  })

  it('should not authenticate a invalid password', async () => {
    const email = faker.internet.email()
    const password = faker.internet.password()

    const passwordHash = await hashPassword(password)

    await userRepository.create({
      name: faker.person.fullName(),
      email,
      passwordHash,
    })

    await expect(() =>
      authenticationUseCase.execute({
        email,
        password: 'some_wrong_pass',
      })
    ).rejects.toBeInstanceOf(UnauthorizedError)
  })

  it('should not authenticate with unused email', async () => {
    const email = faker.internet.email()
    const password = faker.internet.password()

    const passwordHash = await hashPassword(password)

    await userRepository.create({
      name: faker.person.fullName(),
      email,
      passwordHash,
    })

    await expect(() =>
      authenticationUseCase.execute({
        email: 'anotheremail@email.com',
        password,
      })
    ).rejects.toBeInstanceOf(UnauthorizedError)
  })
})

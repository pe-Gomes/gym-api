import { UsersRepository } from '@/repositories/users-repository'
import { UnauthorizedError } from './errors'
import { comparePasswords } from '@/lib/utils'

type AuthenticationUseCaseRequest = {
  email: string
  password: string
}

export class AuthenticationUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(data: AuthenticationUseCaseRequest) {
    const user = await this.usersRepository.findByEmail(data.email)

    if (!user) {
      throw new UnauthorizedError('Bad credentials.')
    }

    const isValidPassword = await comparePasswords(
      data.password,
      user.passwordHash
    )

    if (!isValidPassword) {
      throw new UnauthorizedError('Bad credentials.')
    }

    return {
      user,
    }
  }
}

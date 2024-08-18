import { hashPassword } from '@/lib/utils'
import { UsersRepository } from '@/repositories/users-repository'

interface RegisterUseCaseArgs {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(private repository: UsersRepository) {}

  async execute({ name, email, password }: RegisterUseCaseArgs) {
    const userExists = await this.repository.findByEmail(email)

    if (userExists) {
      throw new Error('Email already exists')
    }

    const passwordHash = await hashPassword(password)

    await this.repository.create({
      name,
      email,
      passwordHash,
    })
  }
}

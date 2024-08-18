import { hashPassword } from '@/lib/utils'
import { UsersRepository } from '@/repositories/users-repository'
import { ConflictError } from './errors'

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
      throw new ConflictError()
    }

    const passwordHash = await hashPassword(password)

    const user = await this.repository.create({
      name,
      email,
      passwordHash,
    })

    return {
      user,
    }
  }
}

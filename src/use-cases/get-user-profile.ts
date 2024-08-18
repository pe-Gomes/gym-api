import { UsersRepository } from '@/repositories/users-repository'
import { NotFoundError } from './errors'

interface GetUserProfileUseCaseRequest {
  userId: string
}

export class GetUserProfileUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute(data: GetUserProfileUseCaseRequest) {
    const user = await this.userRepository.findById(data.userId)

    if (!user) {
      throw new NotFoundError('User not found.')
    }

    return { user }
  }
}

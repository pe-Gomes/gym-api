import { CheckInsRepository } from '@/repositories/check-ins-repository'

type GetUserCheckInsUseCaseRequest = {
  userId: string
  limit?: number
  page?: number
}

export class GetUserCheckInsUseCase {
  constructor(private checkInRepository: CheckInsRepository) {}

  async execute(data: GetUserCheckInsUseCaseRequest) {
    const checkIns =
      await this.checkInRepository.findManyByUserIdAndPaginate(data)

    return { checkIns }
  }
}

import { CheckInsRepository } from '@/repositories/check-ins-repository'

type CheckInUseCaseRequest = {
  userId: string
  gymId: string
}

export class CheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}
  async execute(data: CheckInUseCaseRequest) {
    const checkIn = await this.checkInsRepository.create({
      userId: data.userId,
      gymId: data.gymId,
    })

    return { checkIn }
  }
}

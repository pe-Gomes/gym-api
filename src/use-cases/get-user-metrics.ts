import { CheckInsRepository } from '@/repositories/check-ins-repository'

export class GetUserMetricsUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}
  async execute({ userId }: { userId: string }) {
    const checkInsCount = await this.checkInsRepository.countByUserId(userId)

    return { checkInsCount }
  }
}

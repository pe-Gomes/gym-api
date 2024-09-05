import { GymsRepository } from '@/repositories/gyms-repository'

type SearchGymsUseCaseRequest = {
  query: string
  page: number
}

export class SearchGymsUseCase {
  constructor(private gymRepository: GymsRepository) {}

  async execute(data: SearchGymsUseCaseRequest) {
    const gyms = await this.gymRepository.search(data)

    return { gyms }
  }
}

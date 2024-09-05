import { GymsRepository } from '@/repositories/gyms-repository'

export class FetchNearbyGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}
  async execute({
    userLatitude,
    userLongitude,
  }: {
    userLatitude: number
    userLongitude: number
  }) {
    const gyms = await this.gymsRepository.getManyByLocation({
      userLatitude,
      userLongitude,
    })

    return { gyms }
  }
}

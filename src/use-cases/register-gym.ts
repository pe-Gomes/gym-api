import { GymsRepository } from '@/repositories/gyms-repository'

type RegisterGymRequest = {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

export class RegisterGymUseCase {
  constructor(private gymRepository: GymsRepository) {}

  async execute(data: RegisterGymRequest) {
    const gym = await this.gymRepository.create(data)
    return { gym }
  }
}

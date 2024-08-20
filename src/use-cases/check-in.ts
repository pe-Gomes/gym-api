import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { GymsRepository } from '@/repositories/gyms-repository'
import {
  MaxCheckInsReachedError,
  MismatchLocationError,
  NotFoundError,
} from './errors'
import { getDistanceBetweenCoordinates } from '@/lib/utils'

type CheckInUseCaseRequest = {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

export class CheckInUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository,
    private gymsRepository: GymsRepository
  ) {}

  async execute(data: CheckInUseCaseRequest) {
    const gym = await this.gymsRepository.findById(data.gymId)

    if (!gym) {
      throw new NotFoundError('Gym not found')
    }

    const distanceFromGymToUser = getDistanceBetweenCoordinates(
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      },
      {
        latitude: data.userLatitude,
        longitude: data.userLongitude,
      }
    )

    const MAX_DISTANCE = 0.1 // 100 meters in kilometers

    if (distanceFromGymToUser > MAX_DISTANCE) {
      throw new MismatchLocationError('User is too far from the gym')
    }

    const isCheckedInToday = await this.checkInsRepository.findByUserIdOnDate(
      data.userId,
      new Date()
    )

    if (isCheckedInToday) {
      throw new MaxCheckInsReachedError('User reached max check-ins for today.')
    }

    const checkIn = await this.checkInsRepository.create({
      userId: data.userId,
      gymId: data.gymId,
    })

    return { checkIn }
  }
}

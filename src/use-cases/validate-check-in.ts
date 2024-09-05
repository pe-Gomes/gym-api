import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { CheckInTimeoutError, NotFoundError } from './errors'

type ValidateCheckInRequest = {
  checkInId: string
}

export class ValidateCheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({ checkInId }: ValidateCheckInRequest) {
    const checkIn = await this.checkInsRepository.findById(checkInId)

    if (!checkIn) {
      throw new NotFoundError('Check-in not found')
    }

    const validationDate = new Date()

    const timeDifferenceInMilliseconds = Math.abs(
      checkIn.createdAt.getTime() - validationDate.getTime()
    )

    const MAX_TIME_DIFFERENCE = 1000 * 60 * 20 // 20 minutes

    if (timeDifferenceInMilliseconds > MAX_TIME_DIFFERENCE) {
      throw new CheckInTimeoutError()
    }

    checkIn.validatedAt = validationDate

    await this.checkInsRepository.update(checkIn)

    return { checkIn }
  }
}

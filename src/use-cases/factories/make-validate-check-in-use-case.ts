import { PrismaCheckInsRepository } from '@/repositories/prisma-check-ins-repository'
import { ValidateCheckInUseCase } from '../validate-check-in'

export function makeValidateCheckInUseCase() {
  const checkInRepo = new PrismaCheckInsRepository()
  return new ValidateCheckInUseCase(checkInRepo)
}

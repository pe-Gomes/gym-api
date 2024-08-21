import { PrismaCheckInsRepository } from '@/repositories/prisma-check-ins-repository'
import { GetUserCheckInsUseCase } from '../get-user-check-ins'

export function makeGetUserCheckInsUseCase() {
  const repository = new PrismaCheckInsRepository()
  return new GetUserCheckInsUseCase(repository)
}

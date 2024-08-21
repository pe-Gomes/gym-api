import { PrismaCheckInsRepository } from '@/repositories/prisma-check-ins-repository'
import { GetUserMetricsUseCase } from '../get-user-metrics'

export function makeGetUserMetricsUseCase() {
  const repository = new PrismaCheckInsRepository()
  return new GetUserMetricsUseCase(repository)
}

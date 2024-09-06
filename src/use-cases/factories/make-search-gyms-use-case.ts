import { PrismaGymsRepository } from '@/repositories/prisma-gyms-repository'
import { SearchGymsUseCase } from '../search-gyms'

export function makeSearchGymsUseCase() {
  const repo = new PrismaGymsRepository()
  return new SearchGymsUseCase(repo)
}

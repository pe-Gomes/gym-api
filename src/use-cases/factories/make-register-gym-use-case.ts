import { PrismaGymsRepository } from '@/repositories/prisma-gyms-repository'
import { RegisterGymUseCase } from '../register-gym'

export function makeRegisterGymUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  return new RegisterGymUseCase(gymsRepository)
}

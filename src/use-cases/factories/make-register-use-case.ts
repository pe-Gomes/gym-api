import { PrismaUsersRepository } from '@/repositories/prisma-user-repository'
import { RegisterUseCase } from '../register'

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository()
  return new RegisterUseCase(usersRepository)
}

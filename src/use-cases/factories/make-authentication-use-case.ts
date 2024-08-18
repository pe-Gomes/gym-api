import { PrismaUsersRepository } from '@/repositories/prisma-user-repository'
import { AuthenticationUseCase } from '../authentication'

export function makeAuthenticationUseCase() {
  const userRepository = new PrismaUsersRepository()
  return new AuthenticationUseCase(userRepository)
}

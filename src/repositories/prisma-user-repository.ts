import { db } from '@/infra/db'
import { type Prisma } from '@prisma/client'
import { type UsersRepository } from './users-repository'

export class PrismaUsersRepository implements UsersRepository {
  async create(data: Prisma.UserCreateInput) {
    return await db.user.create({
      data,
    })
  }

  async findByEmail(email: string) {
    return await db.user.findFirst({
      where: {
        email,
      },
    })
  }

  async findById(id: string) {
    return await db.user.findUnique({
      where: {
        id,
      },
    })
  }
}

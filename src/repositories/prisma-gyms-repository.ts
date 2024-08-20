import { Prisma } from '@prisma/client'
import { GymsRepository } from './gyms-repository'
import { db } from '@/infra/db'

export class PrismaGymsRepository implements GymsRepository {
  async create(data: Prisma.GymCreateInput) {
    return await db.gym.create({ data })
  }
  async findById(id: string) {
    return await db.gym.findUnique({
      where: { id },
    })
  }
}

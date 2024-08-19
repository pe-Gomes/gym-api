import { Prisma } from '@prisma/client'
import { CheckInsRepository } from './check-ins-repository'
import { db } from '@/infra/db'

export class PrismaCheckInsRepository implements CheckInsRepository {
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    return await db.checkIn.create({ data })
  }
}

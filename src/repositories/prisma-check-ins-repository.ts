import { db } from '@/infra/db'
import { Prisma } from '@prisma/client'
import { CheckInsRepository } from './check-ins-repository'

export class PrismaCheckInsRepository implements CheckInsRepository {
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    return await db.checkIn.create({ data })
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const from = date
    const to = date
    from.setHours(0, 0, 0, 0)
    to.setHours(23, 59, 59, 999)

    return await db.checkIn.findFirst({
      where: {
        userId,
        createdAt: {
          gte: from,
          lte: to,
        },
      },
    })
  }
}

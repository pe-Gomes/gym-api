import { db } from '@/infra/db'
import { CheckIn, Prisma } from '@prisma/client'
import { CheckInsRepository } from './check-ins-repository'

export class PrismaCheckInsRepository implements CheckInsRepository {
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    return await db.checkIn.create({ data })
  }

  async findById(id: string) {
    return await db.checkIn.findUnique({ where: { id } })
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const from = new Date(date)
    const to = new Date(date)
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

  async countByUserId(userId: string) {
    return await db.checkIn.count({
      where: { userId },
    })
  }

  async findManyByUserIdAndPaginate({
    userId,
    page,
    limit,
  }: {
    userId: string
    page?: number
    limit?: number
  }): Promise<CheckIn[]> {
    return await db.checkIn.findMany({
      where: {
        userId,
      },
      take: limit ?? undefined,
      skip: page ? (page - 1) * (limit ?? 0) : undefined,
      orderBy: {
        createdAt: 'desc',
      },
    })
  }

  async update(checkIn: CheckIn): Promise<CheckIn> {
    return await db.checkIn.update({ where: { id: checkIn.id }, data: checkIn })
  }
}

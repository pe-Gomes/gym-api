import { Gym, Prisma } from '@prisma/client'
import { GymsRepository } from './gyms-repository'
import { db } from '@/infra/db'

export class PrismaGymsRepository implements GymsRepository {
  async create(data: Prisma.GymCreateInput) {
    return await db.gym.create({ data })
  }

  async search({ query, page }: { query: string; page: number }) {
    return await db.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })
  }

  async getManyByLocation({
    userLatitude,
    userLongitude,
  }: {
    userLatitude: number
    userLongitude: number
  }) {
    return await db.$queryRaw<Gym[]>`
      SELECT * from gyms
      WHERE ( 6371 * acos( cos( radians(${userLatitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${userLongitude}) ) + sin( radians(${userLatitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `
  }

  async findById(id: string) {
    return await db.gym.findUnique({
      where: { id },
    })
  }
}

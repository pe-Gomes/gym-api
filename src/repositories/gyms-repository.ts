import type { Gym, Prisma } from '@prisma/client'

export interface GymsRepository {
  create(data: Prisma.GymCreateInput): Promise<Gym>

  findById(id: string): Promise<Gym | null>

  search({ query, page }: { query: string; page: number }): Promise<Gym[]>

  getManyByLocation({
    userLatitude,
    userLongitude,
  }: {
    userLatitude: number
    userLongitude: number
  }): Promise<Gym[]>
}

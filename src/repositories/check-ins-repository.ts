import { CheckIn, Prisma } from '@prisma/client'

export type FindManyByUserIdAndPaginateParams = {
  userId: string
  page?: number
  limit?: number
}

export interface CheckInsRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  countByUserId(userId: string): Promise<number>
  findById(id: string): Promise<CheckIn | null>
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
  findManyByUserIdAndPaginate(
    params: FindManyByUserIdAndPaginateParams
  ): Promise<CheckIn[]>
  update(checkIn: CheckIn): Promise<CheckIn>
}

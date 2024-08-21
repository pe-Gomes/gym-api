import { CheckIn, Prisma } from '@prisma/client'

export interface CheckInsRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  countByUserId(userId: string): Promise<number>
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
  findManyByUserIdAndPaginate({
    userId,
    page,
    limit,
  }: {
    userId: string
    page?: number
    limit?: number
  }): Promise<CheckIn[]>
}

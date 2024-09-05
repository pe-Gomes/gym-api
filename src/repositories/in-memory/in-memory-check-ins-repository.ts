import { CheckIn, Prisma } from '@prisma/client'
import { CheckInsRepository } from '../check-ins-repository'

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public checkIns: CheckIn[] = []

  create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn: CheckIn = {
      id: String(this.checkIns.length + 1),
      gymId: data.gymId,
      userId: data.userId,
      validatedAt: data.validatedAt ? new Date(data.validatedAt) : null,
      createdAt: new Date(),
    }

    this.checkIns.push(checkIn)
    return Promise.resolve(checkIn)
  }

  findById(id: string) {
    return Promise.resolve(
      this.checkIns.find((checkIn) => checkIn.id === id) ?? null
    )
  }

  countByUserId(userId: string): Promise<number> {
    return Promise.resolve(
      this.checkIns.filter((checkIn) => checkIn.userId === userId).length
    )
  }

  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null> {
    return Promise.resolve(
      this.checkIns.find((checkIn) => {
        return (
          checkIn.userId === userId &&
          checkIn.createdAt.getDate() === date.getDate() &&
          checkIn.createdAt.getMonth() === date.getMonth() &&
          checkIn.createdAt.getFullYear() === date.getFullYear()
        )
      }) ?? null
    )
  }

  findManyByUserIdAndPaginate({
    userId,
    page,
    limit,
  }: {
    userId: string
    page?: number
    limit?: number
  }) {
    const filteredByUser = this.checkIns.filter(
      (checkIn) => checkIn.userId === userId
    )

    if (!page && !limit) {
      return Promise.resolve(filteredByUser)
    }

    // Checks the position into the array corresponding to a page and limit
    const firstIndex = (page ? page - 1 : 1) * (limit ?? 1)
    const lastIndex = firstIndex + (limit ?? 1)

    return Promise.resolve(filteredByUser.slice(firstIndex, lastIndex))
  }

  update(checkIn: CheckIn) {
    const checkInIndex = this.checkIns.findIndex(
      (item) => item.id === checkIn.id
    )

    if (checkInIndex === -1) {
      throw new Error()
    }

    return Promise.resolve((this.checkIns[checkInIndex] = checkIn))
  }
}

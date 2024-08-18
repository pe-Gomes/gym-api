import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = []

  create(data: Prisma.UserCreateInput) {
    const user: User = {
      ...data,
      id: String(this.users.length + 1),
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.users.push(user)
    return Promise.resolve(user)
  }

  findByEmail(email: string) {
    return Promise.resolve(
      this.users.find((user) => user.email === email) ?? null
    )
  }
  findById(id: string) {
    return Promise.resolve(this.users.find((user) => user.id === id) ?? null)
  }
}

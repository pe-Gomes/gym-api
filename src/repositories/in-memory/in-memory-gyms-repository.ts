import { Gym, Prisma } from '@prisma/client'
import { GymsRepository } from '../gyms-repository'

export class InMemoryGymsRepository implements GymsRepository {
  public gyms: Gym[] = []

  create(data: Prisma.GymCreateInput) {
    const gym: Gym = {
      id: String(this.gyms.length + 1),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(parseFloat(data.latitude.toString())),
      longitude: new Prisma.Decimal(parseFloat(data.longitude.toString())),
    }

    this.gyms.push(gym)

    return Promise.resolve(gym)
  }

  findById(id: string) {
    return Promise.resolve(this.gyms.find((gym) => gym.id === id) ?? null)
  }
}

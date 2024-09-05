import { Gym, Prisma } from '@prisma/client'
import { GymsRepository } from '../gyms-repository'
import { getDistanceBetweenCoordinates } from '@/lib/utils'

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

  search({ query, page }: { query: string; page: number }) {
    return Promise.resolve(
      this.gyms
        .filter((gym) => gym.title.includes(query))
        .slice((page - 1) * 20, page * 20)
    )
  }

  getManyByLocation({
    userLatitude,
    userLongitude,
  }: {
    userLatitude: number
    userLongitude: number
  }) {
    return Promise.resolve(
      this.gyms.filter((gym) => {
        const distance = getDistanceBetweenCoordinates(
          { latitude: userLatitude, longitude: userLongitude },
          {
            latitude: gym.latitude.toNumber(),
            longitude: gym.longitude.toNumber(),
          }
        )

        return distance < 10 // 10km of distance
      })
    )
  }

  findById(id: string) {
    return Promise.resolve(this.gyms.find((gym) => gym.id === id) ?? null)
  }
}

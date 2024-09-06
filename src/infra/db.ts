import { PrismaClient } from '@prisma/client'
import { env } from '@/env'

export const db = new PrismaClient({
  log:
    env.NODE_ENV === 'production' || env.NODE_ENV === 'test'
      ? ['error']
      : ['query', 'info', 'warn', 'error'],
})

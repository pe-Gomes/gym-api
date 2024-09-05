import { PrismaClient } from '@prisma/client'
import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import type { Environment } from 'vitest/environments'

const prisma = new PrismaClient()

function generateDatabaseURL(schema: string) {
  const env = process.env.DATABASE_URL

  if (!env) {
    throw new Error('DATABASE_URL is not set')
  }

  const url = new URL(env)
  url.searchParams.set('schema', schema)

  return url
}

export default <Environment>{
  name: 'prisma',
  transformMode: 'ssr',
  setup() {
    const schema = randomUUID()

    const url = generateDatabaseURL(schema)

    process.env.DATABASE_URL = url.toString()

    execSync('pnpm prisma migrate deploy')

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`
        )

        await prisma.$disconnect()
      },
    }
  },
}

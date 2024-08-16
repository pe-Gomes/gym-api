import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  PORT: z.coerce.number().default(3333),
})

const parsed = envSchema.safeParse({
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
})

if (!parsed.success) {
  console.error(
    'error reading env variables:\n',
    parsed.error.flatten().fieldErrors
  )
  process.exit(1)
}

export const env = parsed.data

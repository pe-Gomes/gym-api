import fastify from 'fastify'
import { appRoutes } from './http/routes'
import { ZodError } from 'zod'
import fastifyJwt from '@fastify/jwt'
import { env } from './env'

export const app = fastify()

app.register(appRoutes)
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: '7d',
  },
})

app.setErrorHandler((err, _, res) => {
  if (err instanceof ZodError) {
    res.status(400).send({
      message: 'Validation error',
      issues: err.format(),
    })
  }

  return res.status(500).send({ message: 'Internal server error.' })
})

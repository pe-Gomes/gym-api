import fastify from 'fastify'
import { checkInsRoutes, gymsRoutes, usersRoutes } from './http/routes'
import { ZodError } from 'zod'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import { env } from './env'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '15m',
  },
})
app.register(fastifyCookie)

app.register(gymsRoutes)
app.register(usersRoutes)
app.register(checkInsRoutes)

app.setErrorHandler((err, _, res) => {
  if (err instanceof ZodError) {
    res.status(400).send({
      message: 'Validation error',
      issues: err.format(),
    })
  }

  return res.status(500).send({ message: 'Internal server error.' })
})

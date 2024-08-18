import fastify from 'fastify'
import { appRoutes } from './http/routes'
import { ZodError } from 'zod'

export const app = fastify()

app.register(appRoutes)

app.setErrorHandler((err, _, res) => {
  if (err instanceof ZodError) {
    res.status(400).send({
      message: 'Validation error',
      issues: err.format(),
    })
  }

  return res.status(500).send({ message: 'Internal server error.' })
})

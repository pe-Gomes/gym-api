export class ConflictError extends Error {
  constructor(message?: string) {
    super(message ?? 'Conflict error.')
  }
}

export class NotFoundError extends Error {}

export class UnauthorizedError extends Error {
  constructor(message?: string) {
    super(message ?? 'Unauthorized.')
  }
}

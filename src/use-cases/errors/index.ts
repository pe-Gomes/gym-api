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

export class CheckInTimeoutError extends Error {
  constructor() {
    super(
      'The check-in can only be validated within 20 minutes of its creation.'
    )
  }
}

export class MismatchLocationError extends Error {}

export class MaxCheckInsReachedError extends Error {}

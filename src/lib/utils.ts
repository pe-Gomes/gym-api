import { compare, hash } from 'bcryptjs'

const SALT_ROUNDS = 6

export async function hashPassword(pass: string) {
  return await hash(pass, SALT_ROUNDS)
}

export async function comparePasswords(pass: string, hash: string) {
  return await compare(pass, hash)
}

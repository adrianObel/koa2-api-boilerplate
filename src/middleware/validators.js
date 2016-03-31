import User from '../models/users'
import config from '../../config'
import { verify } from 'jsonwebtoken'

function getToken(ctx) {
  const header = ctx.request.header.authorization
  if (!header) {
    return null
  }
  const parts = header.split(' ')
  if (parts.length !== 2) {
    return null
  }
  const scheme = parts[0]
  const token = parts[1]
  if (/^Bearer$/i.test(scheme)) {
    return token
  }
  return null
}

export async function ensureUser(ctx, next) {
  const token = getToken(ctx)

  if (!token) {
    ctx.throw(401)
  }

  let decoded = null
  try {
    decoded = verify(token, config.token)
  } catch (err) {
    ctx.throw(401)
  }

  const user = await User.findById(decoded.id, '-password')
  if (!user) {
    ctx.throw(401)
  }

  return next()
}

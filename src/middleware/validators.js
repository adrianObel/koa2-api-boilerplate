import User from '../models/users'
import config from '../../config'
import { verify } from 'jsonwebtoken'

export async function ensureUser(ctx, next) {
  const { token } = ctx.query

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

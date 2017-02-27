import { verify } from 'jsonwebtoken'
import config from 'config'
import User from 'models/users'
import { getToken } from 'utils/auth'

export async function validateSession (ctx, next) {
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

  ctx.state.user = await User.findById(decoded.id, '-password')
  if (!ctx.state.user) {
    ctx.throw(401)
  }

  return next()
}

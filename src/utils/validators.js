import { verify } from 'jsonwebtoken'
import User from 'models/users'
import config from 'config'
import db from 'db'
import { getToken } from 'utils/auth'

/**
 * Validate user session.
 * Attaches user object to ctx.state.session.user
 */
export async function authorize (ctx, next) {
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

  try {
    ctx.state.session = {
      ...ctx.state.session,
      user: await User.findById(decoded.id)
    }
  } catch (err) {
    if (err instanceof db.Model.NotFoundError) {
      return ctx.throw(401)
    } else {
      return ctx.throw(err)
    }
  }

  return next()
}

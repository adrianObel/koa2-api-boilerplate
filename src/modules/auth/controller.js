import passport from 'koa-passport'
import jwt from 'jsonwebtoken'
import config from '../../../config'

export async function authUser(ctx, next) {
  return passport.authenticate('local', (user) => {
    if (!user) {
      ctx.throw(401)
    }

    const token = jwt.sign({ id: user.id }, config.token)

    const response = user.toJSON()

    delete response.password
    delete response.salt

    ctx.body = {
      token,
      user: response
    }
  })(ctx, next)
}

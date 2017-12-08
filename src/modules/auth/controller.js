import passport from 'koa-passport'
import db from 'db'

export async function authEmail (ctx, next) {
  return passport.authenticate('local', (err, user) => {
    if (err instanceof db.Model.NotFoundError) {
      return ctx.throw(401, 'Incorrect email or password')
    } else if (err) {
      return ctx.throw(err)
    }

    if (!user) {
      return ctx.throw(401, 'Incorrect email or password')
    }

    ctx.state.user = user

    return next()
  })(ctx, next)
}

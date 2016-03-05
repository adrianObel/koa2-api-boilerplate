import convert from 'koa-convert'
import serve from 'koa-static'

export function errorMiddleware() {
  return async (ctx, next) => {
    try {
      await next()
    } catch (err) {
      ctx.status = err.status || 500
      ctx.body = err.message
      ctx.app.emit('error', err, ctx)
    }
  }
}

export function docs() {
  return async (ctx, next) => {
    if(ctx.path !== '/docs') {
      return next()
    }

    await convert(serve(`${process.cwd()}/docs/`))();
  }
}

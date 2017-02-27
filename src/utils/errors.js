export function errorMiddleware () {
  return async (ctx, next) => {
    try {
      await next()
    } catch (err) {
      if (err.isJoi) {
        ctx.status = 422
      } else {
        ctx.status = err.status || 500
      }

      ctx.body = err.message
      ctx.app.emit('error', err, ctx)
    }
  }
}

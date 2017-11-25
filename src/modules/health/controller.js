import pkg from 'pkg'

export async function ping (ctx) {
  ctx.status = 200
  ctx.body = {
    version: pkg.version
  }
}

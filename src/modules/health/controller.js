import pkg from 'pkg'

export async function ping (ctx) {
  ctx.body = {
    version: pkg.version
  }
}

export function getToken (ctx) {
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

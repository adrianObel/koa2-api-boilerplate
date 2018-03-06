const User = require('../models/users')
const config = require('../../config')
const getToken = require('../utils/auth')
const jwt = require('jsonwebtoken')

module.exports = async function ensureUser (ctx, next) {
  //console.log(`getToken: ${typeof (getToken)}`)
  const token = getToken(ctx)

  if (!token) {
    //console.log(`Err: Token not provided.`)
    ctx.throw(401)
  }

  let decoded = null
  try {
    //console.log(`token: ${JSON.stringify(token, null, 2)}`)
    //console.log(`config: ${JSON.stringify(config, null, 2)}`)
    decoded = jwt.verify(token, config.token)
  } catch (err) {
    //console.log(`Err: Token could not be decoded: ${err}`)
    ctx.throw(401)
  }

  ctx.state.user = await User.findById(decoded.id, '-password')
  if (!ctx.state.user) {
    //console.log(`Err: Could not find user.`)
    ctx.throw(401)
  }

  return next()
}

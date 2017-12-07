import User from 'models/user'

export async function createUser (ctx, next) {
  const user = new User(ctx.request.body.user)

  try {
    ctx.state.user = await user.save()
  } catch (err) {
    ctx.throw(422, err.message)
  }

  return next()
}

export async function getUsers (ctx, next) {
  const users = await User.findAll()

  ctx.state.users = users

  return next()
}

export async function getUser (ctx, next) {
  try {
    ctx.state.user = await User.findById(ctx.params.userId)
  } catch (err) {
    return ctx.throw(404, 'User not found')
  }

  return next()
}

export async function updateUser (ctx, next) {
  const { user } = ctx.state

  Object.keys(ctx.request.body.user).forEach(attr => {
    user.set(attr, ctx.request.body.user[attr])
  })

  ctx.state.user = await user.save()

  return next()
}

export async function deleteUser (ctx, next) {
  const { user } = ctx.state

  ctx.state.user = await user.destroy()

  return next()
}

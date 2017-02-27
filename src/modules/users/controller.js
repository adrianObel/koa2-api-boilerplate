import User from 'models/users'

export async function createUser (ctx) {
  const user = new User(ctx.request.body.user)
  try {
    await user.save()
  } catch (err) {
    ctx.throw(422, err.message)
  }

  const token = user.generateToken()
  const response = user.toJSON()

  delete response.password

  ctx.body = {
    user: response,
    token
  }
}

export async function getUsers (ctx, next) {
  const users = await User.find({}, '-password')
  ctx.state.users = users

  return next()
}

export async function getUser (ctx, next) {
  try {
    const user = await User.findById(ctx.params.id, '-password')
    if (!user) {
      ctx.throw(404)
    }

    ctx.state.user = user
  } catch (err) {
    if (err === 404 || err.name === 'CastError') {
      ctx.throw(404)
    }

    ctx.throw(500)
  }

  return next()
}

export async function updateUser (ctx) {
  const user = ctx.state.user

  Object.assign(user, ctx.request.body.user)

  await user.save()

  ctx.body = {
    user
  }
}

export async function deleteUser (ctx) {
  const user = ctx.state.user

  await user.remove()

  ctx.status = 200
  ctx.body = {
    success: true
  }
}

import User from '../../models/users'

export async function createUser(ctx) {
  const user = new User(ctx.request.body.user)
  try {
    await user.save()
  } catch (err) {
    ctx.throw(422, err.message)
  }

  const token = user.generateToken()
  const response = user.toJSON()

  delete response.password
  delete response.salt

  ctx.body = {
    user: response,
    token
  }
}

export async function getUsers(ctx) {
  const users = await User.find({}, '-password -salt')
  ctx.body = { users }
}

export async function getUser(ctx, next) {
  try {
    const user = await User.findById(ctx.params.id, '-password -salt')
    if (!user) {
      ctx.throw(404)
    }

    ctx.body = {
      user
    }
  } catch (err) {
    if (err === 404 || err.name === 'CastError') {
      ctx.throw(404)
    }

    ctx.throw(500)
  }

  next()
}

export async function updateUser(ctx) {
  const user = ctx.body.user

  Object.assign(user, ctx.request.body.user)

  await user.save()

  ctx.body = {
    user
  }
}

export async function deleteUser(ctx) {
  const user = ctx.body.user

  await user.remove()

  ctx.status = 200
  ctx.body = {
    success: true
  }
}

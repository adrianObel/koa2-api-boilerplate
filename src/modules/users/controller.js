import User from '../../models/users'
import config from '../../../config'
import jwt from 'jsonwebtoken'

export async function createUser(ctx) {
  const user = new User(ctx.request.body.user)
  try {
    await user.save()
    const token = jwt.sign({ id: user.id }, config.token)

    const response = user.toJSON()

    delete response.password
    delete response.salt

    ctx.body = {
      user: response,
      token
    }
  } catch (err) {
    ctx.throw(422, err)
  }
}

export async function getUsers (ctx) {
  const users = await User.find({}, '-password -salt')
  ctx.body = users
}

export async function getUser (ctx) {
  try {
    const user = await User.findById(ctx.params.id, '-password -salt')
    if (!user) {
      ctx.throw(404)
    }

    ctx.body = user
  } catch (err) {
    if (err === 404 || err.name === 'CastError') {
      ctx.throw(404)
    }

    ctx.throw(500)
  }
}

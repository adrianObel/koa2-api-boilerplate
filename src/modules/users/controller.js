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

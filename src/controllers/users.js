import Router from 'koa-router'
import User from '../models/users'
import config from '../../config'
import jwt from 'jsonwebtoken'
import { ensureUser } from '../middleware/validators'

const router = new Router({ prefix: '/users' })

router.get('/',
  ensureUser,
  async (ctx) => {
    const users = await User.find({}, '-password -salt')
    ctx.body = users
  }
)

router.get('/:id',
  ensureUser,
  async (ctx) => {
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
)

router.post('/',
  async (ctx) => {
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
)

router.put('/:id',
  ensureUser,
  async (ctx) => {
    try {
      const user = await User.findById(ctx.params.id, '-password -salt')
      if (!user) {
        ctx.throw(404)
      }

      Object.assign(user, ctx.request.body.user)

      await user.save()
      ctx.body = {
        user
      }
    } catch (err) {
      if (err === 404 || err.name === 'CastError') {
        ctx.throw(404)
      }

      ctx.throw(500)
    }
  }
)

router.delete('/:id',
  ensureUser,
  async (ctx) => {
    try {
      const user = await User.findById(ctx.params.id)
      if (!user) {
        ctx.throw(404)
      }

      await user.remove()

      ctx.body = 200
    } catch (err) {
      if (err === 404 || err.name === 'CastError') {
        ctx.throw(404)
      }

      ctx.throw(500)
    }
  }
)

export default router

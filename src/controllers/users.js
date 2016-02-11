import Router from 'koa-router'
import User from '../models/users'
import jwt from 'jsonwebtoken'

const router = new Router({ prefix: '/users' })

router.get('/',
  async (ctx) => {
    try {
      const users = User.find({}, '-password')
      ctx.body = users
    } catch(err) {
      this.throw(err, 500)
    }
  }
)

router.get('/:id',
  async (ctx) => {
    try {
      const user = await User.findById(ctx.params.id, '-password')
      if(!user) {
        this.throw(404)
      }
      ctx.body = user
    } catch(err) {
      this.throw(err, 500)
    }
  }
)

router.post('/',
  async (ctx) => {
    const user = new User(ctx.request.body.user)
    try {
      await user.save()
      const token = jwt.sign({ id: user.id }, config.token)

      delete user.password

      ctx.body = {
        user,
        token
      }
    } catch(err) {
      ctx.throw(422, err)
    }
  }
)

router.put('/:id',
  async (ctx) => {
    try {
      const user = await User.findById(ctx.params.id)

      if(!user) {
        throw new Error({ status: 404 })
      }

      Object.assign(user, ctx.request.body.user)

      await user.save()

      ctx.body = 200
    } catch (err) {
      ctx.throw(404)
    }
  }
)

router.delete('/:id',
  async (ctx) => {
    try {
      const user = await User.findById(ctx.params.id)

      if(!user) {
        throw new Error({ status: 404 })
      }

      await user.remove()

      ctx.body = 200
    } catch (err) {
      ctx.throw(404)
    }
  }
)

export default router

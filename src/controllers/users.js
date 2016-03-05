import Router from 'koa-router'
import User from '../models/users'
import config from '../../config'
import jwt from 'jsonwebtoken'
import { ensureUser } from '../middleware/validators'

const router = new Router({ prefix: '/users' })

/**
 * @api {get} /users Get all users
 * @apiPermission user
 * @apiVersion 1.0.0
 * @apiName GetUsers
 * @apiGroup Users
 *
 * @apiExample Example usage:
 * curl -H "Content-Type: application/json" -X GET localhost:5000/users
 *
 * @apiSuccess {Object[]}   users           Array of user objects
 * @apiSuccess {ObjectId}   users._id       User id
 * @apiSuccess {String}     users.name      User name
 * @apiSuccess {String}     users.username  User username
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "users": [{
 *          "_id": "56bd1da600a526986cf65c80"
 *          "username": "foo"
 *          "username": "johndoe"
 *       }]
 *     }
 *
 * @apiUse TokenError
 */
router.get('/',
  ensureUser,
  async (ctx) => {
    const users = await User.find({}, '-password -salt')
    ctx.body = users
  }
)

/**
 * @api {get} /users/:id Get user by id
 * @apiPermission user
 * @apiVersion 1.0.0
 * @apiName GetUser
 * @apiGroup Users
 *
 * @apiExample Example usage:
 * curl -H "Content-Type: application/json" -X GET localhost:5000/users/56bd1da600a526986cf65c80
 *
 * @apiSuccess {Object}   users             User object
 * @apiSuccess {ObjectId}   users._id       User id
 * @apiSuccess {String}     users.name      User name
 * @apiSuccess {String}     users.username  User username
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "user": {
 *          "_id": "56bd1da600a526986cf65c80"
 *          "username": "foo"
 *          "username": "johndoe"
 *       }
 *     }
 *
 * @apiUse TokenError
 */
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

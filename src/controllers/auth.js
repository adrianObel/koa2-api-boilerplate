import Router from 'koa-router'
import passport from 'koa-passport'
import jwt from 'jsonwebtoken'
import config from '../../config/config'

const router = new Router({ prefix: '/auth' })


/**
 * @api {post} /auth Authenticate user
 * @apiVersion 1.0.0
 * @apiName AuthUser
 * @apiGroup Auth
 *
 * @apiParam {String} email User email.
 * @apiParam {String} password User password.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "user": {
 *          "username": "johndoe"
 *        },
 *       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ"
 *     }
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "status": 401,
 *       "error": "Unauthorized"
 *     }
 */
router.post('/', async (ctx, next) =>
  passport.authenticate('local', (user) => {
    if (!user) {
      ctx.throw(401)
    }

    const token = jwt.sign({ id: user.id }, config.token)

    const response = user.toJSON()

    delete response.password
    delete response.salt

    ctx.body = {
      token,
      user: response
    }
  })(ctx, next)
)

export default router

import Router from 'koa-router'
import config from '../../config/config'

const router = new Router({ prefix: '/users' })

router.get('/',
  async (ctx) => {
    ctx.body = {}
  }
)

export default router

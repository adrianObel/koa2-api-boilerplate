import glob from 'glob'
import Router from 'koa-router'

exports = module.exports = function initModules(app) {
  glob(`${__dirname}/*`, { ignore: '**/index.js' }, (err, matches) => {
    if (err) { throw err }

    matches.forEach((mod) => {
      const routerConfig = require(`${mod}/router`).default
      const router = new Router({ prefix: routerConfig.base })

      for (const [key, props] of Object.entries(routerConfig)) {
        if (key === 'base') { continue }

        const {
          method = '',
          route = '',
          handlers = []
        } = props

        router[method.toLowerCase()](route, ...handlers)

        app
          .use(router.routes())
          .use(router.allowedMethods())
      }
    })
  })
}

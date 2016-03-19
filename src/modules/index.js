import glob from 'glob'
import Router from 'koa-router'

exports = module.exports = function initModules(app) {
  glob(`${__dirname}/*`, { ignore: '**/index.js' }, (err, matches) => {
    if (err) { throw err }

    matches.forEach((mod) => {
      const router = require(`${mod}/router`)

      const routes = router.default
      const baseUrl = router.baseUrl
      const instance = new Router({ prefix: baseUrl })

      routes.forEach((config) => {
        const {
          method = '',
          route = '',
          handlers = []
        } = config

        instance[method.toLowerCase()](route, ...handlers)

        app
          .use(instance.routes())
          .use(instance.allowedMethods())
      })
    })
  })
}

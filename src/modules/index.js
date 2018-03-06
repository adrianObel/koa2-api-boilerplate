const glob = require('glob')
const Router = require('koa-router')

module.exports = function initModules (app) {
  glob(`${__dirname}/*`, { ignore: '**/index.js' }, (err, matches) => {
    if (err) { throw err }

    // Loop through each sub-directory in the modules directory.
    matches.forEach((mod) => {
      // console.log(`router = ${mod}/router`)
      const router = require(`${mod}/router`)

      const routes = router.routes
      const baseUrl = router.baseUrl
      const instance = new Router({ prefix: baseUrl })

      // console.log(`routes: ${JSON.stringify(routes, null, 2)}`)

      // Loop through each route defined in the router.js file.
      routes.forEach((config) => {
        // console.log(`modules/index.js config: ${JSON.stringify(config, null, 2)}`)
        // const {
        //  method = '',
        //  route = '',
        //  handlers = []
        // } = config
        const method = config.method || ''
        const route = config.route || ''
        const handlers = config.handlers || []

        const lastHandler = handlers.pop()

        instance[method.toLowerCase()](route, ...handlers, async function (ctx) {
          // console.log(`typeof lastHandler: ${typeof (lastHandler)}`)
          return await lastHandler(ctx)
        })

        // console.log(`instance: ${JSON.stringify(instance, null, 2)}`)

        app
          .use(instance.routes())
          .use(instance.allowedMethods())
      })
    })
  })
}

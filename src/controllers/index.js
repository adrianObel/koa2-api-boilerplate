import { Glob } from 'glob'

exports = module.exports = function Controllers(app) {
  new Glob(`${__dirname}/*.js`, { ignore: '**/index.js' }, (err, matches) => {
    if (err) { throw err }

    matches.forEach((file) => {
      const controller = require(file).default
      app
        .use(controller.routes())
        .use(controller.allowedMethods())
    })
  })
}

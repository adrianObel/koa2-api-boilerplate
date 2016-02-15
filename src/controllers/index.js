import glob from 'glob'

exports = module.exports = function Controllers(app) {
  glob(`${__dirname}/*.js`, { ignore: '**/index.js' }, (err, matches) => {
    if (err) { throw err }

    matches.forEach((file) => {
      const controller = require(file).default
      app
        .use(controller.routes())
        .use(controller.allowedMethods())
    })
  })
}

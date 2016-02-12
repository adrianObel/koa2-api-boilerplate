import users from './users'
import auth from './auth'

exports = module.exports = function Controllers(app) {
  app
    .use(auth.routes())
    .use(auth.allowedMethods())

    .use(users.routes())
    .use(users.allowedMethods())
}

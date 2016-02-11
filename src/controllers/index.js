import users from './users'

exports = module.exports = function Controllers(app) {
  app
    .use(users.routes())
    .use(users.allowedMethods())
}

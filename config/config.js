const env = process.env.NODE_ENV || 'development'

const config = {
  common: {
    port: process.env.PORT || 5000
  },
  development: {
    session: 'secret-boilerplate-token',
    token: 'secret-jwt-token',
    database: 'mongodb://localhost:27017/koa2-boilerplate'
  },
  production: {
    session: 'secret-boilerplate-token',
    token: 'secret-jwt-token',
    database: 'mongodb://localhost:27017/koa2-boilerplate'
  }
}

export default Object.assign({}, config.common, config[env])

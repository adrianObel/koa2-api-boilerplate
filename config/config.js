const env = process.env.NODE_ENV || 'development'

const config = {
  common: {
    port: process.env.PORT || 5000
  },
  development: {
    session: 'secret-boilerplate-token'
  },
  production: {
    session: 'secret-boilerplate-token'
  }
}

export default Object.assign({}, config.common, config[env])

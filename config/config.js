const env = process.env.NODE_ENV || 'development'

const config = {
  common: {
    port: process.env.PORT || 5000
  },
  development: {},
  production: {}
}

export default Object.assign({}, config.common, config[env])

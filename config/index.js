module.exports = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  token: process.env.JWT_TOKEN_SECRET,
  database: {
    postgres: {
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT,
      charset: 'utf8'
    }
  }
}

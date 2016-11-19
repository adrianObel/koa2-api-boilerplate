export default {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT,
  token: process.env.JWT_TOKEN_SECRET,
  database: process.env.DATABASE_URL
}

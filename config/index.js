const common = require('./env/common')

const env = process.env.NODE_ENV || 'development'
const config = require(`./env/${env}`)

module.exports = Object.assign({}, common, config)

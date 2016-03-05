import common from './env/common'

const env = process.env.NODE_ENV || 'development'
const config = require(`./env/${env}`).default

export default Object.assign({}, common, config)

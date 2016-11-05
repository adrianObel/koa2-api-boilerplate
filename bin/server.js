import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import koaLogger from 'koa-logger'
import mongoose from 'mongoose'
import passport from 'koa-passport'
import mount from 'koa-mount'
import serve from 'koa-static'

import config from '../config'
import logger from '../lib/logger'
import { errorMiddleware } from '../src/utils/errors'

const app = new Koa()
app.keys = [config.session]

mongoose.Promise = global.Promise
mongoose.connect(config.database)

app.use(koaLogger())
app.use(bodyParser())
app.use(errorMiddleware())

app.use(mount('/docs', serve(`${process.cwd()}/docs`)))

require('../lib/passport')
app.use(passport.initialize())

const modules = require('../src/modules')
modules(app)

app.listen(config.port, () => {
  logger.info(`Server started on ${config.port}`)
})

export default app

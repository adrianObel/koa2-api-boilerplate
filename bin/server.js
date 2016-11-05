import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import logger from 'koa-logger'
import mongoose from 'mongoose'
import passport from 'koa-passport'
import mount from 'koa-mount'
import serve from 'koa-static'

import config from '../config'
import { errorMiddleware } from '../src/middleware'

const app = new Koa()
app.keys = [config.session]

mongoose.Promise = global.Promise
mongoose.connect(config.database)

app.use(logger())
app.use(bodyParser())
app.use(errorMiddleware())

app.use(mount('/docs', serve(`${process.cwd()}/docs`)))

require('../lib/passport')
app.use(passport.initialize())

const modules = require('../src/modules')
modules(app)

app.listen(config.port, () => {
  console.log(`Server started on ${config.port}`)
})

export default app

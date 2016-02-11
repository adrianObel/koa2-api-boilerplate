import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import convert from 'koa-convert'
import logger from 'koa-logger'
import mongoose from 'mongoose'
import session from 'koa-generic-session'
import passport from 'koa-passport'

import config from './config'
import { errorMiddleware } from '../src/utils'

const app = new Koa()
app.keys = [config.session]

mongoose.connect(config.database)

app.use(convert(logger()))
app.use(convert(bodyParser()))
app.use(convert(session()))
app.use(errorMiddleware())

require('./passport')
app.use(passport.initialize())
app.use(passport.session())

const router = require('../src/controllers')
router(app)

app.listen(config.port, () => {
  console.log(`Server started on ${config.port}`)
})

export default app

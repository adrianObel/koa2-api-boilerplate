import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import convert from 'koa-convert'

import config from './config'
import { errorMiddleware } from '../src/utils'

const app = new Koa()

app.use(errorMiddleware())
app.use(convert(bodyParser()))

const router = require('../src/controllers')
router(app)

app.listen(config.port, () => {
  console.log(`Server started on ${config.port}`)
})

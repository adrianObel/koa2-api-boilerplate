import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import koaLogger from 'koa-logger'
import koaError from 'koa-error'
// import mongoose from 'mongoose'
// import passport from 'koa-passport'
// import mount from 'koa-mount'
// import serve from 'koa-static'

import pkg from 'pkg'
import config from 'config'
import logger from 'logger'
import router from 'modules'

// initialize database connection
import 'db'

const app = new Koa()
// app.keys = [config.session]

// mongoose.Promise = global.Promise
// mongoose.connect(config.database)

app.use(koaLogger())
app.use(bodyParser())
app.use(koaError())

// require('../lib/passport')
// app.use(passport.initialize())

router(app)

app.listen(config.port, () => {
  console.log(`${pkg.name}: ${config.env}`)
  console.log(`Running on http://127.0.0.1:${config.port}`)
})

export default app

import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import koaLogger from 'koa-logger'
import koaError from 'koa-error'
import passport from 'koa-passport'

import pkg from 'pkg'
import config from 'config'
import router from 'modules'

// initialize database connection
import 'db'
// initialize auth strategies
import 'passport'

const app = new Koa()

// disable logger for tests
if (config.env !== 'test') {
  app.use(koaLogger())
}

app.use(bodyParser())
app.use(koaError())
app.use(passport.initialize())

router(app)

if (config.env !== 'test') {
  app.listen(config.port, () => {
    console.log(`${pkg.name}: ${config.env}`)
    console.log(`Version: ${pkg.version}`)
    console.log(`Running on http://127.0.0.1:${config.port}`)
  })
}

export default app

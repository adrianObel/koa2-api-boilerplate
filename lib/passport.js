import passport from 'koa-passport'
import { Strategy } from 'passport-local'
import User from 'models/user'

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id)
    done(null, user)
  } catch (err) {
    done(err)
  }
})

passport.use('local', new Strategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    const user = await User.findOne({ email })
    if (!user) { return done(null, false) }

    const isMatch = await user.verifyPassword(password)
    if (!isMatch) { return done(null, false) }

    done(null, user)
  } catch (err) {
    return done(err)
  }
}))

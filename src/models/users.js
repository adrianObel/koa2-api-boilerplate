import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const User = new mongoose.Schema({
  type: { type: String, default: 'User' },
  name: { type: String },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  salt: { type: String }
})

User.pre('save', function preSave(next) {
  const user = this

  if (!user.isModified('password')) {
    return next()
  }

  new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) { return reject(err) }
      return salt
    })
  })
  .then(salt => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) { throw new Error(err) }

      user.password = hash
      user.salt = salt
      return user
    })
  })
  .then(() => {
    next()
  })
})

User.methods.validatePassword = function validatePassword(password) {
  const user = this

  return new Promise((resolve, reject) => {
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) { return reject(err) }

      resolve(isMatch)
    })
  })
}

export default mongoose.model('user', User)

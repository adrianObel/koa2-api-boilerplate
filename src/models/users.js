import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const User = new mongoose.Schema({
  type: { type: String, default: 'User' },
  name: { type: String },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  salt: { type: String, required: true }
})

User.pre('save', function(next) {
  const user = this

  if(!user.isModified('password')) {
    return next()
  }

  bcrypt.genSalt(10, (err, salt) => {
    if(err) { return next(err) }

    bcrypt.hash(user.password, salt, (err, hash) => {
      if(err) { return next(err) }

      user.password = hash
      next()
    })
  })
})

User.methods.validatePassword = function(password) {
  const user = this

  return new Promise((resolve, reject) => {
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if(err) { return reject(err) }

      resolve(isMatch)
    });
  })
};

export default mongoose.model('user', User)

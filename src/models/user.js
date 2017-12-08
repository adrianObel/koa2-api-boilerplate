import bcrypt from 'bcryptjs'
import Joi from 'joi'
import { Model } from 'db'

const User = Model.extend({
  tableName: 'users',

  validate: {
    name: Joi.string(),
    password: Joi.string(),
    email: Joi.string().email()
  },

  // stripped from query
  hidden: ['password'],

  initialize () {
    this.on('saving', async () => {
      const hash = await bcrypt.hash(this.get('password'), 13)
      this.set('password', hash)
    })
  },

  verifyPassword (password) {
    return bcrypt.compare(password, this.get('password'))
  }
})

export default User

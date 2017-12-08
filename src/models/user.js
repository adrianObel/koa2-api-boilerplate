import bcrypt from 'bcryptjs'
import Joi from 'joi'
import jwt from 'jsonwebtoken'
import config from 'config'
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
    this.on('saving', async (model, attrs) => {
      if (model.hasChanged('password')) {
        const hash = await bcrypt.hash(this.get('password'), 13)
        this.set('password', hash)
      }
    })
  },

  verifyPassword (password) {
    return bcrypt.compare(password, this.get('password'))
  },

  generateToken () {
    const payload = {
      id: this.get('id'),
      admin: this.get('admin')
    }

    return jwt.sign(payload, config.token, {
      expiresIn: '10h'
    })
  }
})

export default User

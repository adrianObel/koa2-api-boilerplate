import { Model } from 'db'
import Joi from 'joi'

const User = Model.extend({
  tableName: 'users',

  validate: {
    name: Joi.string(),
    password: Joi.string(),
    email: Joi.string().email()
  },

  // stripped from query
  hidden: ['password']
})

export default User

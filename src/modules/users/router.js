import { ensureUser } from '../../middleware/validators'
import * as user from './controller'

export default {
  base: '/users',

  'Create new users': {
    method: 'POST',
    route: '/',
    handlers: [
      user.createUser
    ]
  },

  'Get all users': {
    method: 'GET',
    route: '/',
    handlers: [
      ensureUser,
      user.getUsers
    ]
  },

  'Get a single user': {
    method: 'GET',
    route: '/:id',
    handlers: [
      ensureUser,
      user.getUser
    ]
  },

  'Update user': {
    method: 'PUT',
    route: '/:id',
    handlers: [
      ensureUser,
      user.updateUser
    ]
  },

  'Delete user': {
    method: 'DELETE',
    route: '/:id',
    handlers: [
      ensureUser,
      user.deleteUser
    ]
  }
}

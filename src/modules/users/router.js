import { ensureUser } from '../../middleware/validators'
import * as user from './controller'

export const baseUrl = '/users'

export default [
  {
    method: 'POST',
    route: '/',
    handlers: [
      user.createUser
    ]
  },
  {
    method: 'GET',
    route: '/',
    handlers: [
      ensureUser,
      user.getUsers
    ]
  },
  {
    method: 'GET',
    route: '/:id',
    handlers: [
      ensureUser,
      user.getUser
    ]
  },
  {
    method: 'PUT',
    route: '/:id',
    handlers: [
      ensureUser,
      user.getUser,
      user.updateUser
    ]
  },
  {
    method: 'DELETE',
    route: '/:id',
    handlers: [
      ensureUser,
      user.getUser,
      user.deleteUser
    ]
  }
]

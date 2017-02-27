import { validateSession } from 'utils/validators'
import { fromStateToBody } from 'utils/response'
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
      validateSession,
      user.getUsers,
      fromStateToBody(['users'])
    ]
  },
  {
    method: 'GET',
    route: '/:id',
    handlers: [
      validateSession,
      user.getUser,
      fromStateToBody(['user'])
    ]
  },
  {
    method: 'PUT',
    route: '/:id',
    handlers: [
      validateSession,
      user.getUser,
      user.updateUser
    ]
  },
  {
    method: 'DELETE',
    route: '/:id',
    handlers: [
      validateSession,
      user.getUser,
      user.deleteUser
    ]
  }
]

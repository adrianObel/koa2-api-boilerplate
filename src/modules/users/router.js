// import { validateSession } from 'utils/validators'
import { fromStateToBody } from 'utils/response'
import validator, {
  object,
  string
} from 'koa-context-validator'
import * as user from './controller'

export const baseUrl = '/users'

export default [
  {
    method: 'POST',
    route: '/',
    handlers: [
      validator({
        body: object({
          user: object({
            name: string().required(),
            email: string().required(),
            password: string().required()
          }).required()
        })
      }),
      user.createUser,
      fromStateToBody(['user'])
    ]
  },
  {
    method: 'GET',
    route: '/',
    handlers: [
      // validateSession,
      user.getUsers,
      fromStateToBody(['users'])
    ]
  },
  {
    method: 'GET',
    route: '/:userId',
    handlers: [
      // validateSession,
      user.getUser,
      fromStateToBody(['user'])
    ]
  },
  {
    method: 'PATCH',
    route: '/:userId',
    handlers: [
      // validateSession,
      user.getUser,
      user.updateUser,
      fromStateToBody(['user'])
    ]
  },
  {
    method: 'DELETE',
    route: '/:userId',
    handlers: [
      // validateSession,
      user.getUser,
      user.deleteUser,
      fromStateToBody(['user'])
    ]
  }
]

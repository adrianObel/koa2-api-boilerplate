import validator, { object, string } from 'koa-context-validator'
import * as auth from './controller'
import { fromStateToBody } from 'utils/response'

export const baseUrl = '/auth'

export default [
  {
    method: 'POST',
    route: '/',
    handlers: [
      validator({
        body: object({
          email: string().required(),
          password: string().required()
        })
      }),
      auth.authEmail,
      auth.generateToken,
      fromStateToBody(['user', 'token'])
    ]
  }
]

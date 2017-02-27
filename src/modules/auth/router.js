import validator, { object, string } from 'koa-context-validator'
import * as auth from './controller'

export const baseUrl = '/auth'

export default [
  {
    method: 'POST',
    route: '/',
    handlers: [
      validator({
        body: object({
          username: string().required(),
          password: string().required()
        })
      }),
      auth.authUser
    ]
  }
]

import * as auth from './controller'

export const baseUrl = '/auth'

export default [
  {
    method: 'POST',
    route: '/',
    handlers: [
      auth.authUser
    ]
  }
]

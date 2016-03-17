import * as auth from './controller'

export default {
  base: '/auth',

  'Authenticate user': {
    method: 'POST',
    route: '/',
    handlers: [
      auth.authUser
    ]
  }
}

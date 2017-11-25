import * as health from './controller'

export const baseUrl = '/health'

export default [
  {
    method: 'GET',
    route: '/',
    handlers: [
      health.ping
    ]
  }
]

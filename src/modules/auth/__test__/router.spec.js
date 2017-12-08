import router, { baseUrl } from '../router'
import * as auth from '../controller'

describe('(Router) auth', () => {
  it('should have /auth as its baseUrl', () => {
    expect(baseUrl).toEqual('/auth')
  })

  describe('POST /auth', () => {
    const route = router[0]

    expect(route.route).toBe('/')
    expect(route.handlers.length).toBe(3)
    expect(route.handlers).toContain(auth.authEmail)
  })
})

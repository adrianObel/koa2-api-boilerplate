import router, { baseUrl } from '../router'
import * as health from '../controller'

describe('(Router) health', () => {
  it('should have /health as its baseUrl', () => {
    expect(baseUrl).toEqual('/health')
  })

  describe('GET /health', () => {
    const route = router[0]

    expect(route.route).toBe('/')
    expect(route.handlers.length).toBe(1)
    expect(route.handlers).toContain(health.ping)
  })
})

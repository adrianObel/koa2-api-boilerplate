import router, { baseUrl } from '../router'
import * as user from '../controller'

describe('(Router) users', () => {
  it('should have /users as its baseUrl', () => {
    expect(baseUrl).toEqual('/users')
  })

  describe('POST /users', () => {
    const route = router[0]

    expect(route.route).toBe('/')
    expect(route.handlers.length).toBe(3)
    expect(route.handlers).toContain(user.createUser)
  })

  describe('GET /users', () => {
    const route = router[1]

    expect(route.route).toBe('/')
    expect(route.handlers.length).toBe(2)
    expect(route.handlers).toContain(user.getUsers)
  })

  describe('GET /users/:userId', () => {
    const route = router[2]

    expect(route.route).toBe('/:userId')
    expect(route.handlers.length).toBe(2)
    expect(route.handlers).toContain(user.getUser)
  })

  describe('PATCH /users/:userId', () => {
    const route = router[3]

    expect(route.route).toBe('/:userId')
    expect(route.handlers.length).toBe(4)
    expect(route.handlers).toContain(user.getUser)
    expect(route.handlers).toContain(user.updateUser)
  })

  describe('DELETE /users/:userId', () => {
    const route = router[4]

    expect(route.route).toBe('/:userId')
    expect(route.handlers.length).toBe(3)
    expect(route.handlers).toContain(user.getUser)
    expect(route.handlers).toContain(user.deleteUser)
  })
})

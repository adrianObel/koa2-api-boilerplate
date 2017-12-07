import * as controller from '../controller'
import User from 'models/user'
import { noop } from 'lodash'

jest.mock('models/user')

describe('(Controller) users', () => {
  describe('createUser', () => {
    it('should create a user and attach to ctx.state.user', async () => {
      const user = {
        name: 'foo'
      }

      const ctx = {
        state: {},
        request: {
          body: { user }
        }
      }

      await controller.createUser(ctx, noop)
      expect(ctx.state.user.toJSON()).toEqual(user)
    })
  })

  describe('getUsers', () => {
    it('should fetch all users and attach to ctx.state.users', async () => {
      const ctx = {
        state: {}
      }

      await controller.getUsers(ctx, noop)

      expect(ctx.state.users).toEqual([])
    })
  })

  describe('getUser', () => {
    it('should fetch user by id and attach to ctx.state.users', async () => {
      const ctx = {
        state: {},
        params: {
          userId: 1
        }
      }

      await controller.getUser(ctx, noop)

      expect(ctx.state.user.toJSON()).toEqual({ id: 1 })
    })
  })

  describe('updateUser', () => {
    it('should pull user from state and update', async () => {
      const ctx = {
        state: {
          user: new User({
            id: 1,
            name: 'Foo'
          })
        },
        request: {
          body: {
            user: {
              name: 'Bar'
            }
          }
        }
      }

      await controller.updateUser(ctx, noop)

      expect(ctx.state.user.toJSON()).toEqual({
        id: 1,
        name: 'Bar'
      })
    })
  })

  describe('deleteUser', () => {
    it('should pull user from state and delete', async () => {
      const ctx = {
        state: {
          user: new User({
            id: 1,
            name: 'Foo'
          })
        },
        request: {
          params: {
            userId: 1
          }
        }
      }

      await controller.deleteUser(ctx, noop)

      expect(ctx.state.user.toJSON()).toEqual({
        id: 1,
        name: 'Foo'
      })
    })
  })
})

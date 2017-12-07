import * as controller from '../controller'
import { noop } from 'lodash'

jest.mock('models/user')

describe('(Controller) User', () => {
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

    it('should throw 422 if data fails validation', async () => {
      const user = {}

      const ctx = {
        state: {},
        request: {
          body: { user }
        },
        throw: jest.fn()
      }

      await controller.createUser(ctx, noop)
      expect(ctx.state.user.toJSON()).toEqual(user)
    })
  })
})

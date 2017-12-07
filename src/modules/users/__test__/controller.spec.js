import * as controller from '../controller'
import { noop } from 'lodash'

jest.mock('models/users')

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
  })
})

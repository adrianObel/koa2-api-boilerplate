import * as controller from '../controller'
import { noop } from 'lodash'

describe('(Controller) auth', () => {
  describe('generateToken', () => {
    it('should generate a JWT and attach to state', async () => {
      const generateTokenMock = jest.fn()
      generateTokenMock.mockReturnValue(Promise.resolve('anencodedtoken'))

      const ctx = {
        state: {
          user: {
            generateToken: generateTokenMock
          }
        }
      }

      await controller.generateToken(ctx, noop)
      expect(ctx.state.user.generateToken).toHaveBeenCalled()
      expect(ctx.state.token).toBe('anencodedtoken')
    })
  })
})

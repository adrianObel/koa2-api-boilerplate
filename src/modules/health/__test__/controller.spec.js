import * as controller from '../controller'
import { noop } from 'lodash'
import pkg from 'pkg'

describe('(Controller) health', () => {
  describe('ping', () => {
    it('should return package version', async () => {
      const ctx = {
        state: {}
      }

      await controller.ping(ctx, noop)
      expect(ctx.body).toEqual({
        version: pkg.version
      })
    })
  })
})

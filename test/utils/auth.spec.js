import { expect } from 'chai'
import { getToken } from 'utils/auth'

describe('(Util) auth', () => {
  describe('getToken', () => {
    it('should extract auth token from header', () => {
      const token = 'Bearer jsonwebtoken'
      const mockContext = {
        request: {
          header: { authorization: token }
        }
      }

      expect(getToken(mockContext)).to.equal('jsonwebtoken')
    })

    it('should return null if token is invalid', () => {
      const token = 'tokenIsMissingBearer'
      const mockContext = {
        request: {
          header: { authorization: token }
        }
      }
      expect(getToken(mockContext)).to.be.null
    })
  })
})

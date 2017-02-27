import { expect } from 'chai'
import sinon from 'sinon'
import config from 'config'
import User from 'models/users'
import { validateSession } from 'utils/validators'
import jwt from 'jsonwebtoken'

function generateContext (token) {
  return {
    request: {
      header: { authorization: token }
    },
    state: {},
    throw: (err) => { throw new Error(err) }
  }
}

describe('(Util) validators', () => {
  describe('validateSession', () => {
    it('should throw 401 if auth token is not provided', () => {
      const next = sinon.spy()
      const mockContext = generateContext('')

      try {
        validateSession(mockContext, next)
      } catch (err) {
        expect(err).to.equal(401)
      }
    })

    it('should throw 401 if token is invalid', () => {
      const next = sinon.spy()
      const mockContext = generateContext('nope')

      try {
        validateSession(mockContext, next)
      } catch (err) {
        expect(err).to.equal(401)
      }
    })

    it('should throw 401 if user is not found', () => {
      const next = sinon.spy()
      const mockContext = generateContext('Bearer 4231asda212')

      const stub = sinon.stub(User, 'findById').returns(Promise.reject(null))

      try {
        validateSession(mockContext, next)
      } catch (err) {
        expect(err).to.equal(401)
      }

      stub.restore()
    })

    it('should find a user provided a valid token and attach said user to ctx.state.user', async () => {
      const next = sinon.spy()

      const user = { id: 1, username: 'foo' }
      const token = jwt.sign({ id: user.id }, config.token)
      const mockContext = generateContext(`Bearer ${token}`)

      const stub = sinon.stub(User, 'findById').returns(Promise.resolve(user))

      await validateSession(mockContext, next)
      expect(mockContext.state.user).to.deep.equal(user)
      expect(next.calledOnce).to.be.true

      stub.restore()
    })
  })
})

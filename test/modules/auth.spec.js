import app from '../../bin/server'
import supertest from 'supertest'
import { expect, should } from 'chai'
import { cleanDb } from '../testUtils'
import { createUser, getAuthToken } from '../fixtures/users'

should()
const request = supertest.agent(app.listen())
const context = {}

describe('(Module) Auth', () => {
  beforeEach(async () => {
    await cleanDb()

    context.credentials = { username: 'foo', password: 'foopass' }
    context.user = await createUser(context.credentials)
    context.token = await getAuthToken(request, context.credentials)
  })

  describe('POST /auth', () => {
    it('should throw 401 if credentials are incorrect', (done) => {
      request
        .post('/auth')
        .set('Accept', 'application/json')
        .send({ username: 'notusername', password: 'wrongpassword' })
        .expect(401, done)
    })

    it('should auth user', (done) => {
      request
        .post('/auth')
        .set('Accept', 'application/json')
        .send(context.credentials)
        .expect(200, (err, res) => {
          if (err) { return done(err) }

          res.body.user.should.have.property('username')
          res.body.user.username.should.equal(context.credentials.username)
          expect(res.body.user.password).to.not.exist

          done()
        })
    })
  })
})

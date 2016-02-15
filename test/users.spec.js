import app from '../config/server'
import supertest from 'supertest'
import { expect, should } from 'chai'

should()
const request = supertest.agent(app.listen())
const context = {}

describe('Users', () => {
  describe('POST /users', () => {
    it('should reject signup when data is incomplete', (done) => {
      request
        .post('/users')
        .set('Accept', 'application/json')
        .send({ username: 'supercoolname' })
        .expect(422, done)
    })

    it('should sign up', (done) => {
      request
        .post('/users')
        .set('Accept', 'application/json')
        .send({ user: { username: 'supercoolname', password: 'supersecretpassword' } })
        .expect(200, (err, res) => {
          if (err) { return done(err) }

          res.body.user.should.have.property('username')
          res.body.user.username.should.equal('supercoolname')
          expect(res.body.user.password).to.not.exist
          expect(res.body.user.salt).to.not.exist

          context.user = res.body.user
          context.token = res.body.token

          done()
        })
    })
  })
})

const app = require('../bin/server')
const supertest = require('supertest')
//const { expect, should } = require('chai')
const expect = require('chai').expect;
const should = require('chai').should;
//const { cleanDb, authUser } = require('./utils')
const cleanDb = require('./utils').cleanDb
const authUser = require('./utils').authUser

should()
const request = supertest.agent(app.listen())
const context = {}

describe('Auth', () => {
  before((done) => {
    cleanDb()
    authUser(request, (err, { user, token }) => {
      if (err) { return done(err) }

      context.user = user
      context.token = token
      done()
    })
  })

  describe('POST /auth', () => {
    it('should throw 401 if credentials are incorrect', (done) => {
      request
        .post('/auth')
        .set('Accept', 'application/json')
        .send({ username: 'supercoolname', password: 'wrongpassword' })
        .expect(401, done)
    })

    it('should auth user', (done) => {
      request
        .post('/auth')
        .set('Accept', 'application/json')
        .send({ username: 'test', password: 'pass' })
        .expect(200, (err, res) => {
          if (err) { return done(err) }

          res.body.user.should.have.property('username')
          res.body.user.username.should.equal('test')
          expect(res.body.user.password).to.not.exist

          context.user = res.body.user
          context.token = res.body.token

          done()
        })
    })
  })
})

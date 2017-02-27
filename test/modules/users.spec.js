import app from '../../bin/server'
import supertest from 'supertest'
import { expect, should } from 'chai'
import faker from 'faker'
import { cleanDb } from '../testUtils'
import { createUser, getAuthToken } from '../fixtures/users'

should()
const request = supertest.agent(app.listen())
const context = {}

describe('(Module) Users', () => {
  beforeEach(async () => {
    await cleanDb()

    const credentials = { username: 'foo', password: 'foopass' }
    context.user = await createUser(credentials)
    context.token = await getAuthToken(request, credentials)
  })

  describe('POST /users', () => {
    it('should reject signup when data is incomplete', (done) => {
      request
        .post('/users')
        .set('Accept', 'application/json')
        .send({ username: 'supercoolname' })
        .expect(422, done)
    })

    it('should sign up', (done) => {
      const userData = {
        user: {
          name: faker.name.findName(),
          username: faker.internet.userName(),
          password: faker.internet.password()
        }
      }
      request
        .post('/users')
        .set('Accept', 'application/json')
        .send(userData)
        .expect(200, (err, res) => {
          if (err) { return done(err) }

          res.body.user.should.have.property('username')
          res.body.user.username.should.equal(userData.user.username)
          expect(res.body.user.password).to.not.exist
          done()
        })
    })
  })

  describe('GET /users', () => {
    it('should not fetch users if the authorization header is missing', (done) => {
      request
        .get('/users')
        .set('Accept', 'application/json')
        .expect(401, done)
    })

    it('should not fetch users if token is invalid', (done) => {
      request
        .get('/users')
        .set({
          Accept: 'application/json',
          Authorization: 'Bearer 1'
        })
        .expect(401, done)
    })

    it('should fetch all users', (done) => {
      const { token } = context
      console.log(token)
      request
        .get('/users')
        .set({
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        })
        .expect(200, (err, res) => {
          if (err) { return done(err) }

          res.body.should.have.property('users')

          res.body.users.should.have.length(1)

          done()
        })
    })
  })

  describe('GET /users/:id', () => {
    it('should not fetch user if token is invalid', (done) => {
      request
        .get('/users/1')
        .set({
          Accept: 'application/json',
          Authorization: 'Bearer 1'
        })
        .expect(401, done)
    })

    it('should throw 404 if user doesn\'t exist', (done) => {
      const { token } = context
      request
        .get('/users/1')
        .set({
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        })
        .expect(404, done)
    })

    it('should fetch user', (done) => {
      const {
        user: { _id },
        token
      } = context

      request
        .get(`/users/${_id}`)
        .set({
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        })
        .expect(200, (err, res) => {
          if (err) { return done(err) }

          res.body.should.have.property('user')

          expect(res.body.user.password).to.not.exist

          done()
        })
    })
  })

  describe('PUT /users/:id', () => {
    it('should not update user if token is invalid', (done) => {
      request
        .put('/users/1')
        .set({
          Accept: 'application/json',
          Authorization: 'Bearer 1'
        })
        .expect(401, done)
    })

    it('should throw 404 if user doesn\'t exist', (done) => {
      const { token } = context
      request
        .put('/users/1')
        .set({
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        })
        .expect(404, done)
    })

    it('should update user', (done) => {
      const {
        user: { _id },
        token
      } = context

      request
        .put(`/users/${_id}`)
        .set({
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        })
        .send({ user: { username: 'updatedcoolname' } })
        .expect(200, (err, res) => {
          if (err) { return done(err) }

          res.body.user.should.have.property('username')
          res.body.user.username.should.equal('updatedcoolname')
          expect(res.body.user.password).to.not.exist

          done()
        })
    })
  })

  describe('DELETE /users/:id', () => {
    it('should not delete user if token is invalid', (done) => {
      request
        .delete('/users/1')
        .set({
          Accept: 'application/json',
          Authorization: 'Bearer 1'
        })
        .expect(401, done)
    })

    it('should throw 404 if user doesn\'t exist', (done) => {
      const { token } = context
      request
        .delete('/users/1')
        .set({
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        })
        .expect(404, done)
    })

    it('should delete user', (done) => {
      const {
        user: { _id },
        token
      } = context

      request
        .delete(`/users/${_id}`)
        .set({
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        })
        .expect(200, done)
    })
  })
})

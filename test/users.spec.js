import app from '../config/server'
import supertest from 'supertest'

const request = supertest.agent(app.listen())

describe('Users', () => {
  describe('GET /users', () => {
    it('should respond with 200', (done) => {
      request
        .get('/users')
        .expect(200)
        .expect({}, done)
    })
  })
})

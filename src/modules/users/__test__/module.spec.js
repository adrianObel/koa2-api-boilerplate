import app from '../../../../bin/server'
import supertest from 'supertest'
import faker from 'faker'

const request = supertest.agent(app.listen())

describe('(Module) users', () => {
  describe('POST /users', async () => {
    it('should sign up', async () => {
      const data = {
        user: {
          name: faker.name.findName(),
          email: faker.internet.email(),
          password: faker.internet.password()
        }
      }

      const res = await request
        .post('/users')
        .set('Accept', 'application/json')
        .send(data)
        .expect(200)

      expect(res.body.user).toBeTruthy()
      // res.body.user.should.have.property('username')
      // res.body.user.username.should.equal(userData.user.username)
      // expect(res.body.user.password).to.not.exist
    })
  })
})

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

      const { user } = res.body

      expect(user).toBeTruthy()
      expect(user.name).toBe(data.user.name)
      expect(user.email).toBe(data.user.email)
    })
  })
})

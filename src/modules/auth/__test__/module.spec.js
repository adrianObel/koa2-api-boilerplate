import app from 'server'
import supertest from 'supertest'
import { createUser } from 'fixtures/users'

const request = supertest.agent(app.listen())

describe('(Module) auth', () => {
  describe('POST /auth', () => {
    it('should return a 401 is credentials are incorrect', async () => {
      const data = {
        email: 'fake',
        password: 'wrong'
      }

      await request
        .post('/auth')
        .set('Accept', 'application/json')
        .send(data)
        .expect(401)
    })

    it('should return authorize the user and generate a token', async () => {
      const data = {
        email: 'foo@mail.com',
        password: '123456'
      }

      await createUser(data)

      const res = await request
        .post('/auth')
        .set('Accept', 'application/json')
        .send(data)
        .expect(200)

      const { user } = res.body

      expect(user).toBeTruthy()
      expect(user.email).toBe(data.email)
      expect(user.password).toBe(undefined)
    })
  })
})

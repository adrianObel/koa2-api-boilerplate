import app from 'server'
import supertest from 'supertest'
import faker from 'faker'
import knexCleaner from 'knex-cleaner'
import * as userFixtures from 'fixtures/users'
import db from 'db'

const request = supertest.agent(app.listen())
const fixtures = {}

describe('(Module) users', () => {
  beforeEach(async () => {
    await knexCleaner.clean(db.knex)

    fixtures.user = await userFixtures.createUser()
  })

  describe('POST /users', () => {
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

  describe('GET /users', () => {
    it('should list all users', async () => {
      const res = await request
        .get('/users')
        .set('Accept', 'application/json')
        .expect(200)

      const { users } = res.body

      expect(users).toBeTruthy()
      expect(users.length).toBe(1)
    })
  })

  describe('GET /users/:userId', () => {
    it('should get user by id', async () => {
      const res = await request
        .get(`/users/${fixtures.user.id}`)
        .set('Accept', 'application/json')
        .expect(200)

      const { user } = res.body

      expect(user).toBeTruthy()
      expect(user.email).toBe(fixtures.user.get('email'))
    })
  })

  describe('PATCH /users/:userId', () => {
    it('should update user resource', async () => {
      const data = {
        user: {
          name: 'New Name'
        }
      }

      const res = await request
        .patch(`/users/${fixtures.user.id}`)
        .set('Accept', 'application/json')
        .send(data)
        .expect(200)

      const { user } = res.body

      expect(user).toBeTruthy()
      expect(user.name).toBe(data.user.name)
    })
  })

  describe('DELETE /users/:userId', () => {
    it('should delete resource', async () => {
      const res = await request
        .delete(`/users/${fixtures.user.id}`)
        .set('Accept', 'application/json')
        .expect(200)

      const { user } = res.body

      expect(user).toBeTruthy()
    })
  })
})

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

  describe('GET /users', async () => {
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
})

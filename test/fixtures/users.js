import User from 'models/users'
import faker from 'faker'

export function createUser (attributes) {
  const _user = Object.assign({
    name: faker.name.findName(),
    username: faker.internet.userName(),
    password: faker.internet.password()
  }, attributes)

  const user = new User(_user)
  return user.save()
}

export function getAuthToken (agent, { username, password }) {
  return new Promise((resolve, reject) => {
    agent
    .post('/auth')
    .set('Accept', 'application/json')
    .send({ username, password })
    .end((err, res) => {
      if (err) { return reject(err) }
      resolve(res.body.token)
    })
  })
}

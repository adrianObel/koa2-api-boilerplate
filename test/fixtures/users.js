import User from 'models/user'
import faker from 'faker'

/**
 * Generate user fixture
 */
export function createUser (attrs = {}) {
  attrs = Object.assign({
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  }, attrs)

  const user = new User(attrs)

  return user.save()
}

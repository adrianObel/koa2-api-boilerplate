import User from 'models/user'
import faker from 'faker'

/**
 * Generate user fixture
 */
export function createUser (attrs = {}) {
  Object.assign(attrs, {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  })

  const user = new User(attrs)

  return user.save()
}

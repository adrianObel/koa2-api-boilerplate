import User from 'models/users'
import faker from 'faker'

export function createUser () {
  const user = new User({
    name: faker.name.findName(),
    username: faker.internet.userName(),
    password: faker.internet.password()
  })
  return user.save()
}

import bookshelf from 'db'

const User = bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: true,

  // stripped from query
  hidden: ['password']
})

export default User

import knex from 'knex'
import Bookshelf from 'bookshelf'
import config from 'config'

const connection = knex({
  client: 'postgres',
  connection: config.database.postgres
})

const bookshelf = Bookshelf(connection)

bookshelf.plugin('visibility')

export default bookshelf

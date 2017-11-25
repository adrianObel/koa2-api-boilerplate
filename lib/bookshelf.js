import knex from 'knex'
import bookshelf from 'bookshelf'
import config from 'config'

const connection = knex({
  client: 'postgres',
  connection: config.database.postgres
})

export default bookshelf(connection)

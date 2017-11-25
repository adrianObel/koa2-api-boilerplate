import knex from 'knex'
import Bookshelf from 'bookshelf'
import ModelBase from 'bookshelf-modelbase'
import config from 'config'

const connection = knex({
  client: 'postgres',
  connection: config.database.postgres
})

const bookshelf = Bookshelf(connection)

bookshelf.plugin(ModelBase.pluggable)
bookshelf.plugin('visibility')

export const Model = ModelBase(bookshelf)

export default bookshelf

const config = require('./config')

module.exports = {
  development: {
    client: 'postgresql',
    connection: config.database.postgres,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};

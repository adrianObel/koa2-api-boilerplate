const TABLE_NAME = 'users'

exports.up = function (knex, Promise) {
  // Workaround for https://github.com/tgriesser/knex/issues/1303
  // createTableIfNotExists invokes the callback function
  // even when it should't actually run the migration
  // this causes migrations to fail by trying to duplicate constraints
  return knex.schema.hasTable(TABLE_NAME)
    .then(exists => {
      if (exists) {
        console.log(`===${TABLE_NAME} table found. Skipping===`)
        return
      }

      return knex.schema.createTable(TABLE_NAME, function (table) {
        table.increments('id').primary()
        table.string('name')
        table.string('email').unique()
        table.boolean('admin').defaultTo(false)
        table.string('password')
        table.timestamps()
      })
    })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable(TABLE_NAME)
}

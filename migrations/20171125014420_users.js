
exports.up = function (knex, Promise) {
  // Workaround for https://github.com/tgriesser/knex/issues/1303
  //
  // createTableIfNotExists invokes the callback function
  // even when it should't actually run the migration
  // this causes migrations to fail by trying to duplicate constraints
  const exists = knex.schema.hasTable('users')
  if (exists) { return Promise.resolve() }

  return knex.schema.createTable('users', function (table) {
    table.increments('id').primary()
    table.string('name')
    table.string('email').unique()
    table.boolean('admin').defaultTo(false)
    table.string('password')
    table.timestamps()
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('users')
}

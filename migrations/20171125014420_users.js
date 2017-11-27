
exports.up = function (knex, Promise) {
  return knex.schema.createTableIfNotExists('users', function (table) {
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

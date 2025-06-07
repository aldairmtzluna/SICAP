exports.up = function(knex) {
    return knex.schema.table('agents', table => {
      table.string('password', 255)
      .notNullable()
      .after('address');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.table('agents', table => {
      table.dropColumn('password');
    });
  };
  
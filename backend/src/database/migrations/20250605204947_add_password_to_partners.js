exports.up = function(knex) {
    return knex.schema.table('partners', table => {
      table.string('password', 255)
      .notNullable()
      .after('commission_percentage');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.table('partners', table => {
      table.dropColumn('password');
    });
  };
  
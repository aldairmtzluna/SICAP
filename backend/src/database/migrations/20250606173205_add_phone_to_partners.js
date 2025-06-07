exports.up = function(knex) {
    return knex.schema.table('partners', function(table) {
      table.string('phone', 10)           
        .after('email');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.table('partners', function(table) {
      table.dropColumn('phone');
    });
  };
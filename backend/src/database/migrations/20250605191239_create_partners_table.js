exports.up = function (knex) {
    return knex.schema.createTable('partners', (table) => {
      table.increments('id').primary();
      table.integer('id_agent').unsigned().references('id').inTable('agents');
      table.string('name', 100).notNullable();
      table.string('surnames', 150).notNullable();
      table.string('email', 100).unique().notNullable();
      table.decimal('commission_percentage', 5, 2).defaultTo(0.00);
      table.boolean('status').defaultTo(true);
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('partners');
  };
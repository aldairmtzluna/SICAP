// 202406050000_create_agents_table.js
exports.up = function (knex) {
    return knex.schema.createTable('agents', (table) => {
      table.increments('id').primary();
      table.string('name', 100).notNullable();
      table.string('surnames', 150).notNullable();
      table.string('email', 100).unique().notNullable();
      table.string('phone', 20);
      table.text('address');
      table.boolean('status').defaultTo(true);
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('agents');
  };

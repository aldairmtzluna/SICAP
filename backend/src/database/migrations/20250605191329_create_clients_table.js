// 202406050003_create_clients_table.js
exports.up = function (knex) {
    return knex.schema.createTable('clients', (table) => {
      table.increments('id').primary();
      table.integer('id_agent').unsigned().references('id').inTable('agents');
      table.integer('id_partner').unsigned().references('id').inTable('partners');
      table.string('name', 100).notNullable();
      table.string('surnames', 150).notNullable();
      table.string('rfc', 13).unique();
      table.enum('type', ['individual', 'empresa']).notNullable();
      table.string('email', 100);
      table.string('phone', 20);
      table.text('address');
      table.boolean('status').defaultTo(true);
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('clients');
  };
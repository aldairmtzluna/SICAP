// 202406050002_create_insurers_table.js
exports.up = function (knex) {
    return knex.schema.createTable('insurers', (table) => {
      table.increments('id').primary();
      table.string('name', 100).notNullable();
      table.string('contact', 100);
      table.string('email', 100);
      table.string('phone', 20);
      table.text('address');
      table.boolean('status').defaultTo(true);
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('insurers');
  };
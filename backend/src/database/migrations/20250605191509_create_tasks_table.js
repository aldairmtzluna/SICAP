// 202406050007_create_tasks_table.js
exports.up = function (knex) {
    return knex.schema.createTable('tasks', (table) => {
      table.increments('id').primary();
      table.integer('id_agent').unsigned().references('id').inTable('agents');
      table.integer('id_partner').unsigned().references('id').inTable('partners');
      table.integer('id_client').unsigned().references('id').inTable('clients');
      table.text('description').notNullable();
      table.date('scheduled_date').notNullable();
      table.enum('status', ['pendiente', 'completada', 'cancelada']).defaultTo('pendiente');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('tasks');
  };
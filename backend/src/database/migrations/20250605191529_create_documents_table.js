// 202406050008_create_documents_table.js
exports.up = function (knex) {
    return knex.schema.createTable('documents', (table) => {
      table.increments('id').primary();
      table.integer('id_insurance').unsigned().notNullable().references('id').inTable('insurances');
      table.string('filename', 255).notNullable();
      table.string('path', 255).notNullable();
      table.enum('type', ['poliza', 'identificacion', 'comprobante_pago', 'otro']).notNullable();
      table.boolean('status').defaultTo(true);
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('documents');
  };
exports.up = function (knex) {
    return knex.schema.createTable('beneficiaries', (table) => {
      table.increments('id').primary();
      table.integer('id_insurance').unsigned().notNullable().references('id').inTable('insurances');
      table.string('name', 100).notNullable();
      table.string('relationship', 100);
      table.decimal('percentage', 5, 2).notNullable();
      table.boolean('status').defaultTo(true);
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('beneficiaries');
  };
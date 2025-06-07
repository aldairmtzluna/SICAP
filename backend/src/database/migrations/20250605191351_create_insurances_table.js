exports.up = function (knex) {
    return knex.schema.createTable('insurances', (table) => {
      table.increments('id').primary();
      table.integer('id_client').unsigned().notNullable().references('id').inTable('clients');
      table.integer('id_insurer').unsigned().notNullable().references('id').inTable('insurers');
      table.integer('id_partner').unsigned().references('id').inTable('partners');
      table.string('insurance_number', 50).unique().notNullable();
      table.enum('type', ['vida', 'salud', 'auto', 'hogar', 'otro']).notNullable();
      table.decimal('insured_amount', 12, 2).notNullable();
      table.decimal('annual_premium', 12, 2).notNullable();
      table.date('issue_date').notNullable();
      table.date('start_date').notNullable();
      table.date('end_date').notNullable();
      table.enum('status', ['activa', 'vencida', 'cancelada', 'renovada']).defaultTo('activa');
      table.enum('payment_frequency', ['mensual', 'trimestral', 'semestral', 'anual']).notNullable();
      table.text('comments');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('insurances');
  };
exports.up = function (knex) {
    return knex.schema.createTable('commissions', (table) => {
      table.increments('id').primary();
      table.integer('id_insurance').unsigned().notNullable().references('id').inTable('insurances');
      table.integer('id_partner').unsigned().references('id').inTable('partners');
      table.decimal('total_amount', 12, 2).notNullable();
      table.decimal('percentage_agent', 5, 2).notNullable();
      table.decimal('percentage_partner', 5, 2);
      table.decimal('agent_amount', 12, 2).notNullable();
      table.decimal('partner_amount', 12, 2);
      table.date('payment_date');
      table.enum('status', ['pendiente', 'pagado']).defaultTo('pendiente');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('commissions');
  };
exports.up = function(knex) {
    return knex.schema.createTable('reservations', function(table) {
      table.increments('id');
      table.string('customer_name').notNullable();
      table.datetime('reservation_time').notNullable();
      table.integer('num_people').unsigned().notNullable();
      table.string('phone').notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('reservations');
  };
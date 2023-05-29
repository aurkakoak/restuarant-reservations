exports.up = function(knex) {
    return knex.schema.createTable('restaurants', function(table) {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('email').notNullable();
      // add any other columns that you need
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('restaurants');
  };

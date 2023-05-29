exports.up = function (knex) {
    return knex.schema.table('reservations', function (table) {
        table.integer('restaurant_id').unsigned().notNullable();
        table.foreign('restaurant_id').references('id').inTable('restaurants');
    });
};

exports.down = function (knex) {
    return knex.schema.table('reservations', function (table) {
        table.dropForeign('restaurant_id');
        table.dropColumn('restaurant_id');
    });
};

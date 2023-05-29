/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {   
    return knex.schema.table('reservations', function (table) {
        table.integer('num_people').unsigned().notNullable();
        table.string('phone').notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    table.dropColumn('num_people');
    table.dropColumn('phone');

};

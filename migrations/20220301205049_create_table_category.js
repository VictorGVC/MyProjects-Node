/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// Create category table
exports.up = function(knex) {
    return knex.schema.createTable('category', table => {
        table.increments('cat_id').primary()
        table.string('cat_name', 50).notNullable()
        table.string('cat_description', 400)
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// Drop category table
exports.down = function(knex) {
    return knex.schema.dropTable('category')
};

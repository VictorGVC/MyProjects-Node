/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// Create item table
exports.up = function(knex) {
    return knex.schema.createTable('item', table => {
        table.increments('it_id').primary()
        table.string('it_name', 50).notNullable()
        table.string('it_image', 300)
        table.integer('cat_id', 50).notNullable()
            .references('cat_id').inTable('category')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// Drop item table
exports.down = function(knex) {
    return knex.schema.dropTable('item')
};

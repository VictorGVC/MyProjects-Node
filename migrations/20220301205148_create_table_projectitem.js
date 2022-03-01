/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('project_item', table => {
        table.integer('it_id')
            .references('it_id').inTable('item')
        table.integer('pro_id')
            .references('pro_id').inTable('project')

        table.primary(['it_id', 'pro_id'])
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    knex.schema.dropTable('project_item')
};

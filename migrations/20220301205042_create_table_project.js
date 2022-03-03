/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// Create project table
exports.up = function(knex) {
    return knex.schema.createTable('project', table => {
        table.increments('pro_id').primary()
        table.string('pro_name', 50).notNullable()
        table.string('pro_description', 1000)
        table.string('pro_readme', 200)
        table.string('pro_link', 200)
        table.string('us_id', 50).notNullable()
            .references('us_id').inTable('user')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// Drop project table
exports.down = function(knex) {
    return knex.schema.dropTable('project')
};

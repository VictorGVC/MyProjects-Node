/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('user', table => {
        table.string('us_id', 50).primary()
        table.string('us_password', 50).notNullable()
        table.boolean('us_admin').notNullable().defaultTo(false)
        table.string('us_github', 200)
        table.string('us_linkedin', 200)
        table.string('us_photo', 300)
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('user')
};

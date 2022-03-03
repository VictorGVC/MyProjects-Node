/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

// create user table
exports.up = function(knex) {
    return knex.schema.createTable('user', table => {
        table.increments('us_id').primary()
        table.string('us_username', 50).notNullable()
        table.string('us_password', 300).notNullable()
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

//drop user table
exports.down = function(knex) {
    return knex.schema.dropTable('user')
};

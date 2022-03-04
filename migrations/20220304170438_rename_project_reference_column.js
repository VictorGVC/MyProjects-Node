/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.table ('project', function(table) {
        table.renameColumn('us_id', 'pro_user')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.table ('project', function(table) {
        table.renameColumn('pro_user', 'us_id')
    })
};

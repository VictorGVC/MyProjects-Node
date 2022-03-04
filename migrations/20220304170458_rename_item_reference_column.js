/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.table ('category_item', function(table) {
        table.renameColumn('cat_id', 'it_category')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.table ('category_item', function(table) {
        table.renameColumn('it_category', 'cat_id')
    })
};

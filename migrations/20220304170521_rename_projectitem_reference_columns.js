/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.table ('project_item', function(table) {
        table.renameColumn('pro_id', 'pi_project')
        table.renameColumn('it_id', 'pi_item')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.table ('project_item', function(table) {
        table.renameColumn('pi_project', 'pro_id')
        table.renameColumn('pi_item', 'it_id')
    })
};

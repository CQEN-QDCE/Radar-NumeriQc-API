exports.up = function(knex) {
    return knex.schema.table('enonces', function(table) {
        table.integer('numero').notNullable().unique()
    })
};

exports.down = function(knex) {
    return knex.schema.table('enonces', function(table) {
        table.dropColumn('enonces')
    })
};
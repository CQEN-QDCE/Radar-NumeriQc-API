
exports.up = function(knex) {
    return knex.schema.createTable('axes', function(table) {
        table.uuid('id').notNullable().primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.string('nom', 200).notNullable().unique()
        table.boolean('est_actif')
        })
        
        .createTable('pratiques', function(table) {
        table.uuid('id').notNullable().primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.uuid('id_axe').notNullable()
        table.string('nom', 200).notNullable().unique()
        table.boolean('est_actif')
        table.foreign('id_axe').references('id').inTable('axes').onDelete('CASCADE')
        })
    
        .createTable('enonces', function(table) {
        table.uuid('id').notNullable().primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.uuid('id_pratique').notNullable()
        table.string('texte', 1000).notNullable().unique()
        table.string('reponse_0', 200).notNullable()
        table.string('reponse_1', 200).notNullable()
        table.string('reponse_2', 200).notNullable()
        table.string('reponse_3', 200).notNullable()
        table.string('reponse_4', 200).notNullable()
        table.boolean('est_actif')
        table.foreign('id_pratique').references('id').inTable('pratiques').onDelete('CASCADE')
        })
    
        .createTable('organisations', function(table) {
        table.uuid('id').notNullable().primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.string('nom', 200).notNullable().unique()
        table.boolean('est_actif')
        })
    
        .createTable('organisateurs', function(table) {
        table.uuid('id').notNullable().primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.uuid('id_organisation').notNullable()
        table.string('nom', 200).notNullable()
        table.string('prenom', 200).notNullable()
        table.string('courriel', 200).notNullable().unique()
        table.boolean('est_actif')
        table.string('greenlight_userid', 200)
        table.foreign('id_organisation').references('id').inTable('organisations').onDelete('CASCADE')
        })
    
        .createTable('seances', function(table) {
        table.uuid('id').notNullable().primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.uuid('id_organisation').notNullable()
        table.specificType('participants', 'TEXT[]').notNullable()
        table.boolean('est_officiel').notNullable().defaultTo(false)
        table.index(['id_organisation'], 'SeancesIdOrganisation')
        table.index(['est_officiel'], 'SeancesEstOfficiel')
        table.foreign('id_organisation').references('id').inTable('organisations').onDelete('CASCADE')
        })
        
        .createTable('reponses', function(table) {
        table.uuid('id').notNullable().primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.uuid('id_seance').notNullable()
        table.uuid('id_enonce').notNullable()
        table.enu('type_reponse', ['0', '1', '2', '3', '4', '5']).notNullable()
        table.unique(['id_seance', 'id_enonce'])
        table.index(['id_seance'], 'ReponseIdSeance')
        table.foreign('id_seance').references('id').inTable('seances').onDelete('CASCADE')
        table.foreign('id_enonce').references('id').inTable('enonces').onDelete('CASCADE')
        })
        
        .createTable('lexique', function(table) {
        table.uuid('id').notNullable().primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.string('mot', 50).notNullable().unique()
        table.string('definition', 400).notNullable().unique()
        table.index(['mot'], 'LexiqueMot')
        })
};

exports.down = function(knex) {
    return knex.schema.dropTable('lexique')
    .dropTable('reponses')
    .dropTable('seances')
    .dropTable('organisateurs')
    .dropTable('organisations')
    .dropTable('enonces')
    .dropTable('pratiques')
    .dropTable('axes')
};
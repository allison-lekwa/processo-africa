exports.up = function(knex, Promise) {
    return knex.schema.raw('create extension if not exists "uuid-ossp"')
    // return knex.schema
    .createTable('user', function(table){
        table.uuid('id').notNullable().primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.string('name').notNullable();
        table.string('company').notNullable();
        table.string('country').notNullable();
        table.string('state').notNullable();
        table.string('lga').notNullable();
        table.text('email').unique().notNullable();
        table.text('number').notNullable();
        table.boolean('render').notNullable().defaultTo(false);
        table.boolean('request').notNullable().defaultTo(false);
        table.text('message').notNullable();
        table.text('capacity').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    .createTable('admin', table => {
        table.increments();
        table.text('email').unique().notNullable();
        table.text('password').notNullable();
        table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
    });;
};

exports.down = function(knex, Promise) {
    return knex.schema.raw('drop extension if exists "uuid-ossip"')
    .dropTable('admin')
    .dropTable('user');
};
import Knex from 'knex';

export async function up(knex: Knex){
    return knex.schema.createTable('users', table=>{
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('password').unique().notNullable();
        table.timestamp('createdAt').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
        table.string('passwordResetToken');
        table.timestamp('passwordResetExpires');
    });
}
export async function down(knex: Knex){
    return knex.schema.dropTable('users');
}
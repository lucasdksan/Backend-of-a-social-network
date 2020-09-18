import Knex from 'knex';

export async function up(knex: Knex){
    return knex.schema.createTable('tasks', table=>{
        table.increments('id').primary();
        table.string('title').notNullable();
        table.integer('assingnedTo')
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        table.json('projects')
            .notNullable()
            .references('id')
            .inTable('project')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        table.boolean('completed')
            .notNullable()
            .defaultTo(false);
        table.timestamp('createdAt').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    });
}
export async function down(knex: Knex){
    return knex.schema.dropTable('tasks');
}
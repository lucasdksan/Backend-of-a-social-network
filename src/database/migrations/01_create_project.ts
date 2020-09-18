import Knex from 'knex';

export async function up(knex: Knex){
    return knex.schema.createTable('project', table=>{
        table.increments('id').primary();
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        table.json('task')
            .notNullable()
            .references('id')
            .inTable('tasks')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        table.timestamp('createdAt').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    });
}
export async function down(knex: Knex){
    return knex.schema.dropTable('project');
}
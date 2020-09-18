import knex from 'knex';

const db = knex(
    {
        client: 'mysql2', // Nome do banco de dados que você vai utilizar.
        connection:{
            host : '', // Host, no meu caso localhost.
            user : '', // Nome do user que contém o banco de dados.
            password : '', // Senha para acessar;
            database : '' // Nome do banco de dados.
        },
        useNullAsDefault: true,
    }
);

export default db;
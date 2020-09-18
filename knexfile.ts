import path from 'path';

module.exports = {
    client: 'mysql2', // Nome do banco de dados que você vai utilizar.
    connection:{
        host : '', // Host, no meu caso localhost.
        user : '', // Nome do user que contém o banco de dados.
        password : '', // Senha para acessar;
        database : '' // Nome do banco de dados.
    },
    migrations:{
        directory: path.resolve(__dirname, 'src', 'database', 'migrations'), // Caminho para chegar nas migrations.
    },
    useNullAsDefault: true,
};
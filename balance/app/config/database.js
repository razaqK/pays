
'use strict';
let config = require('./config');

let databaseConfig = {
    client: 'mysql',
    connection: config.database.mysql.connection,
    pool: config.database.mysql.pool
};
let knex = require('knex')(databaseConfig);
module.exports = knex;

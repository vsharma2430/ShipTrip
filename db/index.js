const {Pool} = require('pg')

const pool = new Pool({
    user: 'expressmini',
    password: 'shipsallaround',
    host: 'localhost',
    port: 5432,
    database: 'postgres',
    })

module.exports = pool
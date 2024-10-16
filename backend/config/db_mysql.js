const mysql = require('mysql2/promise');

const dotenv = require('dotenv').config();

const connectMySQL = async () => {
    return await mysql.createConnection({
        host:process.env.HOST_SQL,
        user:process.env.USER_SQL,
        password: process.env.PASSWORD_SQL,
        database: process.env.DB_SQL
    })
}

module.exports = connectMySQL;
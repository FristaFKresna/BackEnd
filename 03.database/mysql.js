const mysql = require('mysql')
require('dotenv').config()

const db = mysql.createConnection({
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    host : process.env.DB_HOST,
    database : process.env.DB_NAME,
    port : 3306
})

module.exports = db
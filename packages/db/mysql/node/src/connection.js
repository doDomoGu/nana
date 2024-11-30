const mysql = require('mysql2/promise')
const dbconfig = require('@mysql:node/config.js')
const getConnection = async () => await mysql.createConnection({
  ...dbconfig
})

module.exports = getConnection

const mysql = require('mysql2/promise')
const dbconfig = require('@mysql:node/config')
const getConnection = async () => await mysql.createConnection({
  ...dbconfig
})

module.exports = getConnection

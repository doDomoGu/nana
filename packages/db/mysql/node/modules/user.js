const getConnection = require('../connection')

module.exports.getList = async () => {
  const connection = await getConnection()

  const [result, fields] = await connection.query(
    `select * from \`user\``
  )

  connection.end()

  return result
}

module.exports.add = async (params) => {
  const connection = await getConnection()

  const [result, fields] = await connection.query(
    `insert into \`user\` (name, pwd, email) values ('${params.name}', '${params.pwd}', '${params.email}')`
  )

  connection.end()

  return result
}

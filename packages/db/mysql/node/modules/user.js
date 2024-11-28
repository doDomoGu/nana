const getConnection = require('../connection')

module.exports.getList = async () => {
  const connection = await getConnection()

  const [result, fields] = await connection.query(
    `select * from \`user\``
  )

  connection.end()

  return result
}

module.exports.getOneByName = async (name) => {
  const connection = await getConnection()

  const [result, fields] = await connection.query(
    `select * from \`user\` where name = '${name}'`
  )

  connection.end()

  if (result.length > 0) {
    return result[0]
  } else {
    return null
  }
}

module.exports.add = async (params) => {
  const connection = await getConnection()

  const [result, fields] = await connection.query(
    `insert into \`user\` (name, pwd, email) values ('${params.name}', '${params.pwd}', '${params.email}')`
  )

  connection.end()

  return result
}

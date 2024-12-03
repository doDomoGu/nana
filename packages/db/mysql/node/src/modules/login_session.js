const RESPONSE = require('@mysql:node/utils/response')

const getConnection = require('@mysql:node/connection')

module.exports.init = async () => {
  try {
    const connection = await getConnection()
    await connection.execute(
      `DROP TABLE IF EXISTS \`login_session\``
    )
    await connection.execute(
      `CREATE TABLE IF NOT EXISTS \`login_session\` (
        \`id\` int NOT NULL AUTO_INCREMENT,
        \`user_id\` int NOT NULL,
        \`session\` varchar(255) NOT NULL,
        \`expired\` datetime NOT NULL,
        PRIMARY KEY (\`id\`),
        UNIQUE KEY \`user_session\` (\`user_id\`,\`session\`)
      )`
    )
    await connection.end()

    return RESPONSE.success(true)
  } catch (e) {
    return RESPONSE.error(e.message)
  }
}

module.exports.add = async (params) => {
  try {
    const connection = await getConnection()

    await connection.execute(
      `INSERT INTO \`login_session\` (user_id, session, expired) VALUES ('${params.user_id}', '${params.session}', DATE_ADD(NOW(), INTERVAL 1 MONTH))`
    )
    await connection.end()

    return RESPONSE.success(true)
  } catch (e) {
    return RESPONSE.error(e.message)
  }
}

module.exports.verify = async (token) => {
  try {
    const connection = await getConnection()

    const [result] = await connection.execute(
      `SELECT * FROM \`login_session\` WHERE session = "${token}"`
    )
    await connection.end()

    return RESPONSE.success(result && result.length == 1 ? result[0] : null)
  } catch (e) {
    return RESPONSE.error(e.message)
  }
}

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
        \`token\` varchar(255) NOT NULL,
        \`expired\` datetime NOT NULL,
        PRIMARY KEY (\`id\`),
        UNIQUE KEY \`token_UNIQUE\` (\`token\`)
      )`
    )
    await connection.end()

    return RESPONSE.success(true)
  } catch (e) {
    return RESPONSE.error(e.message)
  }
}

module.exports.create = async (params) => {
  try {
    const connection = await getConnection()

    await connection.execute(
      `INSERT INTO \`login_session\` (user_id, token, expired) VALUES ('${params.user_id}', '${params.token}', DATE_ADD(NOW(), INTERVAL 1 MONTH))`
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
      `SELECT * FROM \`login_session\` WHERE token = "${token}"`
    )
    await connection.end()

    return RESPONSE.success(result && result.length == 1 ? result[0] : null)
  } catch (e) {
    return RESPONSE.error(e.message)
  }
}

module.exports.remove = async (params) => {
  try {
    const connection = await getConnection()

    const [result] = await connection.execute(
      `DELETE FROM \`login_session\` WHERE token = '${params.token}'`
    )
    await connection.end()

    if (result.affectedRows == 1) {
      return RESPONSE.success(true)
    } else {
      return RESPONSE.error('no session record')
    }

  } catch (e) {
    return RESPONSE.error(e.message)
  }
}
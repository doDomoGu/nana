const getConnection = require('../connection')

module.exports.add = async (params) => {
  const connection = await getConnection()

  try {
    const [result, fields] = await connection.query(
      `insert into \`login_session\` (user_id, session, expired) values ('${params.user_id}', '${params.session}', DATE_ADD(NOW(), INTERVAL 1 MONTH))`
    )
  } catch (e) {
    throw new Error(e.message)
  }

  connection.end()

  return true
}

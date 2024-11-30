const RESPONSE = require('@mysql:node/utils/response')

const getConnection = require('@mysql:node/connection')

module.exports.add = async (params) => {
  try {
    const connection = await getConnection()

    await connection.execute(
      `insert into \`login_session\` (user_id, session, expired) values ('${params.user_id}', '${params.session}', DATE_ADD(NOW(), INTERVAL 1 MONTH))`
    )
    await connection.end()

    return RESPONSE.success(true)
  } catch (e) {
    return RESPONSE.error(e.message)
  }
}

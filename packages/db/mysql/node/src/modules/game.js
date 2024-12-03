const RESPONSE = require('@mysql:node/utils/response')

const getConnection = require('@mysql:node/connection')



module.exports.init = async () => {
  try {
    const connection = await getConnection()
    await connection.execute(
      `DROP TABLE IF EXISTS \`game\``
    )
    await connection.execute(
      `CREATE TABLE IF NOT EXISTS \`game\` (
        \`id\` int NOT NULL,
        \`name\` varchar(100) DEFAULT NULL,
        \`status\` int NOT NULL COMMENT '-1:空房间; 0:未开始, 1:进行中',
        \`create_time\` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
        \`update_time\` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
        PRIMARY KEY (\`id\`)
      )`
    )


    const values = ((len) => {
      const items = []
      for (let i = 1; i <= len; i++) {
        items.push(`(${i}, -1)`)
      }
      return items.join(', ')
    })(20)

    await connection.execute(
      `INSERT INTO \`game\` (id, status) VALUES ${values}`
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

    const [gamesResult] = await connection.execute(
      `SELECT id FROM \`game\` WHERE status = -1 ORDER BY \`id\` ASC limit 1`
    )

    const gameId = gamesResult.length == 1 ? gamesResult[0].id : null
    if (gameId) {
      await connection.execute(
        `UPDATE \`game\` SET name='${params.name}', player_num = '${params.playerNum}', player_ids = '${params.playerId}', status = 0 WHERE id = ${gameId}`
      )
    }

    await connection.end()

    return RESPONSE.success({ gameId })
  } catch (e) {
    return RESPONSE.error(e.message)
  }
}

const RESPONSE = require('@mysql:node/utils/response')

const getConnection = require('@mysql:node/connection')

module.exports.init = async () => {
  try {
    const connection = await getConnection()

    await connection.execute(
      `DROP TABLE IF EXISTS \`game_user\``
    )

    await connection.execute(
      `CREATE TABLE IF NOT EXISTS \`game_user\` (
        \`game_id\` int NOT NULL COMMENT '游戏ID',
        \`room_ord\` int NOT NULL COMMENT '游戏房间中的位置序号, 从1开始, 最大值由创建房间时选择的人数决定',
        \`user_id\` int DEFAULT NULL COMMENT '玩家ID',
        \`game_ord\` int DEFAULT NULL COMMENT '游玩顺序序号, 每次游戏开始时设置',
        UNIQUE KEY \`game_room_ord_UNIQUE\` (\`game_id\`, \`room_ord\`),
        UNIQUE KEY \`game_user_UNIQUE\` (\`game_id\`, \`user_id\`)
      )`
    )

    await connection.end()

    return RESPONSE.success(true)
  } catch (e) {
    return RESPONSE.error(e.message)
  }
}

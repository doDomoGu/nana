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

    // 检测该用户是否已在房间中
    const [userExistRes] = await connection.execute(
      `SELECT user_id FROM \`game_user\` WHERE user_id = ${params.user_id}`
    )

    if (userExistRes && userExistRes.length > 0) {
      throw new Error('already in room')
    }


    // 检测是否有空余的房间
    const [gameRestRes] = await connection.execute(
      `SELECT id FROM \`game\` WHERE status = -1 ORDER BY \`id\` ASC limit 1`
    )

    if (gameRestRes && gameRestRes.length != 1) {
      throw new Error('no available rooms')
    }

    const gameId = gameRestRes[0].id
    // 检测game_user是否有脏数据  
    const [dirtyGameUserRes] = await connection.execute(
      `SELECT * FROM \`game_user\` WHERE game_id = ${gameId}`
    )
    // 有脏数据 直接删除
    if (dirtyGameUserRes && dirtyGameUserRes.length > 0) {
      await connection.execute(
        `DELETE FROM \`game_user\` WHERE game_id = ${gameId}`
      )
    }

    // 添加game_user
    const addGameUserValuesStr = ((gameId, userId, playerNum) => {
      const values = []
      for (let i = 1; i <= playerNum; i++) {
        values.push(`(${gameId},${i}, ${i == 1 ? userId : null})`)
      }
      return values.join(', ')
    })(gameId, params.user_id, params.player_num)

    await connection.execute(
      `INSERT INTO \`game_user\` (game_id, room_ord, user_id) VALUES ${addGameUserValuesStr}`
    )


    // 设置游戏name和将status置为0(未开始)
    await connection.execute(
      `UPDATE \`game\` SET name='${params.name}', status = 0 WHERE id = ${gameId}`
    )

    await connection.end()
    return RESPONSE.success({ gameId })
  } catch (e) {

    return RESPONSE.error(e.message)
  }
}



module.exports.enter = async (params) => {
  try {
    const connection = await getConnection()

    // 检测该用户是否已在房间中
    const [userExistRes] = await connection.execute(
      `SELECT user_id FROM \`game_user\` WHERE user_id = ${params.user_id}`
    )

    if (userExistRes && userExistRes.length > 0) {
      throw new Error('already in room')
    }

    // 检测房间是否是未开始状态
    const [gameNotStartRes] = await connection.execute(
      `SELECT id FROM \`game\` WHERE id = ${params.game_id} and status = 0`
    )

    if (gameNotStartRes && gameNotStartRes.length != 1) {
      throw new Error('game status isn\'t [not start]')
    }

    // 检测房间是否有空位
    const [remainPositionRes] = await connection.execute(
      `SELECT * FROM \`game_user\` WHERE game_id = ${params.game_id} and user_id is NULL ORDER BY \`room_ord\` ASC`
    )

    if (remainPositionRes && gameNotStartRes.length == 0) {
      throw new Error('game status isn\'t [not start]')
    }

    const roomOrd = remainPositionRes[0].room_ord

    // 添加game_user

    await connection.execute(
      `UPDATE \`game_user\` SET user_id = ${params.user_id} WHERE game_id = ${params.game_id} and room_ord =  ${roomOrd}`
    )

    await connection.end()
    return RESPONSE.success(true)
  } catch (e) {

    return RESPONSE.error(e.message)
  }
}


module.exports.leave = async (params) => {
  try {
    const connection = await getConnection()

    // 检测该用户是否在房间中
    const [userExistRes] = await connection.execute(
      `SELECT game_id, user_id, room_ord FROM \`game_user\` WHERE user_id = ${params.user_id}`
    )

    if (!userExistRes || userExistRes.length != 1) {
      throw new Error('not in room')
    }

    const gameId = userExistRes[0].game_id
    const roomOrd = userExistRes[0].room_ord

    // 检测房间是否是未开始状态
    const [gameNotStartRes] = await connection.execute(
      `SELECT id FROM \`game\` WHERE id = ${gameId} and status = 0`
    )

    if (!gameNotStartRes || gameNotStartRes.length != 1) {
      throw new Error('game status isn\'t [not start]')
    }

    // 查询game_user表中 roomOrd >= 当前user的roomOrd
    const [gameUsersRes] = await connection.execute(
      `SELECT user_id, room_ord FROM \`game_user\` WHERE game_id = ${gameId} and room_ord >= ${roomOrd} ORDER BY \`room_ord\` ASC`
    )

    const updateData = []
    for (let i = 0; i < gameUsersRes.length; i++) {
      updateData.push({
        room_ord: gameUsersRes[i].room_ord,
        user_id: i == gameUsersRes.length - 1 ? null : gameUsersRes[i + 1].user_id,
      })
    }


    // 将game_user表中  oomOrd >= 当前user的roomOrd user_id 置为null
    await connection.execute(
      `UPDATE \`game_user\` SET user_id = NULL WHERE game_id = ${gameId} and room_ord >= ${roomOrd}`
    )

    for (let item of updateData) {
      await connection.execute(
        `UPDATE \`game_user\` SET user_id = ${item.user_id} WHERE game_id = ${gameId} and room_ord = ${item.room_ord}`
      )
    }

    await connection.end()
    return RESPONSE.success(true)
  } catch (e) {

    return RESPONSE.error(e.message)
  }
}
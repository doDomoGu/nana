const express = require('express')
const router = express.Router()

const DB = require('@nana/db-mysql_node')

const RESPONSE = require('@frontServer/utils/response')

router.get('/', async (req, res) => {
  const userRes = await DB.user.init()
  if (userRes.code != 200) {
    return res.send(RESPONSE.error(userRes.msg))
  }

  const loginSessionRes = await DB.login_session.init()
  if (loginSessionRes.code != 200) {
    return res.send(RESPONSE.error(loginSessionRes.msg))
  }

  const gameRes = await DB.game.init()
  if (gameRes.code != 200) {
    return res.send(RESPONSE.error(gameRes.msg))
  }

  const gameUserRes = await DB.game_user.init()
  if (gameUserRes.code != 200) {
    return res.send(RESPONSE.error(gameUserRes.msg))
  }

  res.send(true)
})

module.exports = router
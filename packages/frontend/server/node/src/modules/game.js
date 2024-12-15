const express = require('express')
const router = express.Router()

const DB = require('@nana/db-mysql_node')
const RESPONSE = require('@frontServer/utils/response')


router.get('/list', async (req, res) => {
  const result = await DB.game.list()

  res.send(result)
})

router.post('/create', async (req, res) => {
  const params = {
    user_id: res.locals.user.id,
    name: req.body.name,
    game_id: req.body.game_id,
    player_num: req.body.player_num || 2,
  }

  const result = await DB.game.create(params)

  res.send(result)
})

router.post('/enter', async (req, res) => {
  const params = {
    user_id: res.locals.user.id,
    game_id: req.body.game_id
  }

  const result = await DB.game.enter(params)

  res.send(result)
})

router.post('/leave', async (req, res) => {
  const params = {
    user_id: res.locals.user.id
  }

  const result = await DB.game.leave(params)

  res.send(result)
})


router.get('/room', async (req, res) => {
  const params = {
    user_id: res.locals.user.id
  }

  const result = await DB.game.room(params)
  if (result.code == 200) {
    return res.send(RESPONSE.success(result.data))
  } else {
    return res.send(RESPONSE.error(result.msg))
  }
})

module.exports = router
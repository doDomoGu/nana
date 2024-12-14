const express = require('express')
const router = express.Router()

const DB = require('@nana/db-mysql_node')

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

  res.send({ result })
})

router.post('/enter', async (req, res) => {
  const params = {
    user_id: res.locals.user.id,
    game_id: req.body.game_id
  }

  const result = await DB.game.enter(params)

  res.send({ result })
})

router.post('/leave', async (req, res) => {
  const params = {
    user_id: res.locals.user.id
  }

  const result = await DB.game.leave(params)

  res.send({ result })
})

module.exports = router
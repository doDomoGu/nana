const express = require('express')
const router = express.Router()

const DB = require('@nana/db-mysql_node')

router.post('/create', async (req, res) => {
  const params = {
    name: req.body.name,
    playerNum: req.body.player_num || 2,
    playerId: res.locals.user.id
  }

  const result = await DB.game.create(params)

  res.send({ result })
})

module.exports = router
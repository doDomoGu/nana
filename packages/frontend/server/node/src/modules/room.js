const express = require('express')
const router = express.Router()

const DB = require('@nana/db-mysql_node')

router.get('/list', async (req, res) => {
  const result = await DB.user.getList()
  res.send({ result })
})


module.exports = router
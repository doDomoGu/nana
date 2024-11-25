const express = require('express')
const stock = require('./modules/stock')
const stock = require('./modules/stock')

const router = express.Router()

router.use('/test', test)
router.use('/stock', stock)

module.exports = router

const express = require('express')
const router = express.Router()

router.use('/init', require('@frontServer/modules/init'))

router.use('/user', require('@frontServer/modules/user'))
router.use('/game', require('@frontServer/modules/game'))

module.exports = router

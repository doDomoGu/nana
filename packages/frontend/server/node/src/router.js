const express = require('express')
const user = require('@frontServer/modules/user')
const room = require('@frontServer/modules/room')

const router = express.Router()

router.use('/user', user)

// router.use('/room')

module.exports = router

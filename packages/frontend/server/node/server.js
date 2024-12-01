require('module-alias')(__dirname)

const express = require('express')

const router = require('@frontServer/router')

const app = express()

const myAuth = require('@frontServer/middlewares/auth')

app.use(express.urlencoded({ extended: false }))

app.use(myAuth)

app.use('/', router)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

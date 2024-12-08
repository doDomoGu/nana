require('module-alias')(__dirname)

const express = require('express')

const router = require('@frontServer/router')

const app = express()

// ==== 中间件 start === 
// app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(require('@frontServer/middlewares/auth'))

app.use(require('@frontServer/middlewares/delay')())

// === 中间件 end ===

app.use('/', router)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

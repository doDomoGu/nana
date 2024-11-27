require('module-alias/register')

const express = require('express')

// const router = require('./src/router')

// const getConnection = require('@nana/db-mysql_node')

const DB = require('@nana/db-mysql_node')

const app = express()
app.use(express.urlencoded({ extended: false }))

// router.get('/', async (req, res) => {
app.get('/', async (req, res) => {
  // const connection = await getConnection()
  // // console.log(connection)

  // const [result, fields] = await connection.query(
  //   `select * from \`game\``
  // )

  // connection.end()

  const result = await DB.user.getList()

  res.send({ result })
})


app.post('/register', async (req, res) => {
  console.log('body', req.body.name)
  console.log('query', req.query)
  console.log('params', req.params)
  // const params = {
  //   name: req
  // }

  // const result = await DB.user.add(params)

  // res.send({ result })

  res.send({ a: 1 })
})


// app.use('/', router)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

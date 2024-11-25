require('module-alias/register')

const express = require('express')

// const router = require('./src/router')

const getConnection = require('@nana/db:node')

const app = express()




router.get('/', async (req, res) => {
  const connection = await getConnection()
  console.log(connection)

  // const [result, fields] = connection.query(
  //   `select count(*) as total from \`stocks\`` + (query.filter_abnormal ? ` where cur_price is not null` : '')
  // )

  // console.log(result)

  // connection.end()

  res.send({ ok: '200' })

})


// app.use('/', router)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

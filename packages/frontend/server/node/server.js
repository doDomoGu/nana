require('module-alias')(__dirname)

// moduleAlias.addAliases({
//   '@': path.resolve(__dirname + '/src'),
//   '@modules': path.resolve(__dirname + '/src/modules'),
//   '@middlewares': path.resolve(__dirname + '/src/middlewares'),
//   '@utils': path.resolve(__dirname + '/src/utils'),
// })

// "_moduleAliases": {
//     "@": "./src",
//     "@utils": "./src/utils",
//     "@middlewares": "./src/middlewares",
//     "@modules": "./src/modules"
//   }

const express = require('express')

const router = require('@frontServer/router')

const app = express()

// const auth = require('@frontServer/middlewares/auth')

app.use(express.urlencoded({ extended: false }))

// app.use(auth)

app.use('/', router)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

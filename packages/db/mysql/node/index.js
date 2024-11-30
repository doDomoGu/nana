require('module-alias')(__dirname)

// moduleAlias.addAliases({
//   '@': path.resolve(__dirname + '/src'),
//   '@modules': path.resolve(__dirname + '/src/modules'),
//   '@utils': path.resolve(__dirname + '/src/utils'),
// })

const user = require('@mysql:node/modules/user.js')
const login_session = require('@mysql:node/modules/login_session.js')

module.exports = {
  user,
  login_session
}
require('module-alias')(__dirname)

// moduleAlias.addAliases({
//   '@': path.resolve(__dirname + '/src'),
//   '@modules': path.resolve(__dirname + '/src/modules'),
//   '@utils': path.resolve(__dirname + '/src/utils'),
// })

module.exports = {
  user: require('@mysql:node/modules/user'),
  login_session: require('@mysql:node/modules/login_session'),
  game: require('@mysql:node/modules/game'),
  game_user: require('@mysql:node/modules/game_user')
}
const DB = require('@nana/db-mysql_node')

const RESPONSE = require('@frontServer/utils/response')

module.exports = async function (req, res, next) {
  const unauthPaths = ['/user/login', '/user/register', '/init']  // 允许的路由path 不需要auth校验
  if (unauthPaths.includes(req.path)) {
    return next()
  }

  const authHeader = req.headers['authorization'] || '';
  const token = authHeader.split('Bearer ')[1];

  const sessionResult = await DB.login_session.verify(token)
  if (sessionResult.code != 200 || sessionResult.data == null) {
    // 根据token 找不到session记录
    return res.status(401).send(RESPONSE.error('no permission', 401))
  }

  const userResult = await DB.user.getOneById(sessionResult.data.user_id)
  if (userResult.code != 200 || userResult.data == null) {
    // 根据userId 找不到user记录
    return res.status(401).send(RESPONSE.error('wrong user', 401))
  }

  res.locals.user = userResult.data
  return next()

}
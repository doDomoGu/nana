const DB = require('@nana/db-mysql_node')

const RESPONSE = require('@frontServer/utils/response')

module.exports = async function (req, res, next) {
  const unauthPaths = ['/user/login', '/user/register']
  if (unauthPaths.includes(req.path)) {
    return next()
  }

  const authHeader = req.headers['authorization'] || '';
  const token = authHeader.split('Bearer ')[1];

  const result = await DB.login_session.verify({ token })
  if (result.code == 200 && result.data != null) {
    return next()
  } else {
    return res.status(401).send(RESPONSE.error('no permission', 401))
  }

}
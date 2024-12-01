const DB = require('@nana/db-mysql_node')

const RESPONSE = require('@frontServer/utils/response')

module.exports = async function (req, res, next) {
  const authHeader = req.headers['authorization'] || '';
  const token = authHeader.split('Bearer ')[1];

  const result = await DB.login_session.verify({ token })
  if (result.code == 200 && result.data != null) {
    next()
  } else {
    res.status(401).send(RESPONSE.error('no permission'))
  }

}
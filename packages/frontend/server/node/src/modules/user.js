const express = require('express')
const router = express.Router()

const RESPONSE = require('@frontServer/utils/response')

const DB = require('@nana/db-mysql_node')

const { generateRandomString } = require('@frontServer/utils/func')

const encrypto = (str) => {
  const crypto = require("crypto");
  const md5 = crypto.createHash("md5"); //设置加密模式为md5
  const salt = 'appNameIsNana'
  md5.update(str + salt); //把传入的用户密码和自定义的字符串进行编译的到加密过后的密码
  const result = md5.digest("hex"); //设置密码格式为16进制
  return result;//返回后加密过后的密码
}

router.get('/list', async (req, res) => {
  const result = await DB.user.getList()
  if (result.code == 200) {
    return res.send(RESPONSE.success(result.data))
  } else {
    return res.send(RESPONSE.error(result.msg))
  }
})

router.post('/register', async (req, res) => {
  const params = {
    username: req.body.username,
    password: encrypto(req.body.password),
    email: req.body.email
  }

  const result = await DB.user.create(params)

  if (result.code == 200) {
    return res.send(RESPONSE.success(result.data))
  } else {
    return res.send(RESPONSE.error(result.msg))
  }

})

router.post('/login', async (req, res) => {
  const result = await DB.user.getOneByName(req.body.username)
  // console.log(result)
  if (result.code != 200) {
    return res.send(RESPONSE.error(result.msg))
  }

  const user = result.data
  // console.log(!user)
  if (!user || user.pwd != encrypto(req.body.password)) {
    return res.send(RESPONSE.error('wrong user/password', 401))
  }

  const token = generateRandomString(32)

  const createResult = await DB.login_session.create({ user_id: user.id, token })

  if (createResult.code == 200) {
    return res.send(RESPONSE.success({
      token, user: {
        ...user,
        pwd: undefined
      }
    }))
  } else {
    return res.send(RESPONSE.error(createResult.msg))
  }

})

router.post('/logout', async (req, res) => {
  const authHeader = req.headers['authorization'] || '';
  const token = authHeader.split('Bearer ')[1];

  const result = await DB.login_session.remove({ token })
  if (result.code != 200) {
    return res.send(RESPONSE.error(result.msg))
  }

  return res.send(RESPONSE.success(true))

})


router.post('/verify', async (req, res) => {
  const sessionResult = await DB.login_session.verify(req.body.token)
  if (sessionResult.code != 200 || sessionResult.data == null) {
    // 根据token 找不到session记录
    return res.status(401).send(RESPONSE.error('no permission', 401))
  }


  const userResult = await DB.user.getOneById(sessionResult.data.user_id)

  if (userResult.code != 200) {
    return res.send(RESPONSE.error(userResult.msg))
  }

  return res.send(RESPONSE.success({
    ...userResult.data,
    pwd: undefined
  }))

})


module.exports = router
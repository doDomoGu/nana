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

router.get('/init', async (req, res) => {
  const result = await DB.user.init()
  res.send(result)
})

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
    name: req.body.name,
    pwd: encrypto(req.body.pwd),
    email: req.body.email
  }

  const result = await DB.user.add(params)

  if (result.code == 200) {
    return res.send(RESPONSE.success(result.data))
  } else {
    return res.send(RESPONSE.error(result.msg))
  }

})

router.post('/login', async (req, res) => {
  const result = await DB.user.getOneByName(req.body.name)
  // console.log(result)
  if (result.code != 200) {
    return res.send(RESPONSE.error(result.msg))
  }

  const user = result.data
  // console.log(!user)
  if (!user || user.pwd != encrypto(req.body.pwd)) {
    return res.send(RESPONSE.success('wrong user/password', 401))
  }

  const session = generateRandomString(32)

  const sessionAddResult = await DB.login_session.add({ user_id: user.id, session })

  if (sessionAddResult.code == 200) {
    return res.send(RESPONSE.success({ session }))
  } else {
    return res.send(RESPONSE.error(sessionAddResult.msg))
  }

})


module.exports = router
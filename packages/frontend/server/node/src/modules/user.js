const express = require('express')
const router = express.Router()

const DB = require('@nana/db-mysql_node')

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
  res.send({ result })
})

router.post('/register', async (req, res) => {
  // console.log('body', req.body)
  const params = {
    name: req.body.name,
    pwd: encrypto(req.body.pwd),
    email: req.body.email
  }
  try {
    await DB.user.add(params)
  } catch (err) {
    return res.send({ success: false, errmsg: err.message })
  }


  return res.send({ success: true })
})

router.post('/login', async (req, res) => {
  // console.log('body', req.body)
  let user
  try {
    user = await DB.user.getOneByName(req.body.name)
  } catch (err) {
    return res.send({ success: false, errmsg: err.message })
  }

  if (user && user.pwd == encrypto(req.body.pwd)) {
    return res.send({ success: true })
  } else {
    return res.send({ success: false, errmsg: 'wrong name/pwd' })
  }



})


module.exports = router
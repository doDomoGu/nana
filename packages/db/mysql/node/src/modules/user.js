const RESPONSE = require('@mysql:node/utils/response')

const getConnection = require('@mysql:node/connection')

const encrypto = (str) => {
  const crypto = require("crypto");
  const md5 = crypto.createHash("md5"); //设置加密模式为md5
  const salt = 'appNameIsNana'
  md5.update(str + salt); //把传入的用户密码和自定义的字符串进行编译的到加密过后的密码
  const result = md5.digest("hex"); //设置密码格式为16进制
  return result;//返回后加密过后的密码
}


module.exports.init = async () => {
  try {
    const connection = await getConnection()
    await connection.execute(
      `DROP TABLE IF EXISTS \`user\``
    )
    await connection.execute(
      `CREATE TABLE \`user\` (
        \`id\` int NOT NULL AUTO_INCREMENT,
        \`name\` varchar(50) NOT NULL,
        \`pwd\` varchar(255) NOT NULL,
        \`email\` varchar(255) NOT NULL,
        \`create_time\` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
        \`update_time\` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
        PRIMARY KEY (\`id\`),
        UNIQUE KEY \`name_UNIQUE\` (\`name\`),
        UNIQUE KEY \`email_UNIQUE\` (\`email\`)
      )`
    )

    await connection.execute(
      `INSERT INTO \`user\` (name, pwd, email) VALUES ('admin', '${encrypto('123123')}', 'admin@qq.com')`
    )
    await connection.execute(
      `INSERT INTO \`user\` (name, pwd, email) VALUES ('player1', '${encrypto('123123')}', 'player1@qq.com')`
    )
    await connection.execute(
      `INSERT INTO \`user\` (name, pwd, email) VALUES ('player2', '${encrypto('123123')}', 'player2@qq.com')`
    )

    await connection.end()

    return RESPONSE.success(true)
  } catch (e) {
    return RESPONSE.error(e.message)
  }
}


module.exports.getList = async () => {
  try {
    const connection = await getConnection()

    const [result, fields] = await connection.execute(
      `select * from \`user\``
    )

    await connection.end()
    return RESPONSE.success(result)
  } catch (e) {
    return RESPONSE.error(e.message)
  }
}

module.exports.getOneById = async (id) => {
  try {
    const connection = await getConnection()

    const [result, fields] = await connection.execute(
      `select * from \`user\` where id = '${id}'`
    )

    await connection.end()

    if (result && result.length == 1) {
      return RESPONSE.success(result[0])
    } else {
      return RESPONSE.success(null)
    }
  } catch (e) {
    return RESPONSE.error(e.message)
  }
}

module.exports.getOneByName = async (name) => {
  try {
    const connection = await getConnection()

    const [result, fields] = await connection.execute(
      `select * from \`user\` where name = '${name}'`
    )

    await connection.end()

    if (result && result.length == 1) {
      return RESPONSE.success(result[0])
    } else {
      return RESPONSE.success(null)
    }
  } catch (e) {
    return RESPONSE.error(e.message)
  }
}

module.exports.add = async (params) => {
  try {
    const connection = await getConnection()

    await connection.execute(
      `insert into \`user\` (name, pwd, email) values ('${params.name}', '${params.pwd}', '${params.email}')`
    )

    await connection.end()

    return RESPONSE.success(true)
  } catch (e) {
    return RESPONSE.error(e.message)
  }
}

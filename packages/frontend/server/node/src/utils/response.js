module.exports.success = (data, code = 200) => {
  return {
    code,
    data,
    msg: null
  }
}

module.exports.error = (msg, code = 500) => {
  return {
    code,
    data: null,
    msg
  }
}
// delayMiddleware.js
const delay = (ms = 300 + Math.random() * 1000) => {
  return new Promise(resolve => setTimeout(resolve, ms))
};

module.exports = (delayTime) => {
  return async (req, res, next) => {
    await delay(delayTime);
    next();
  };
};
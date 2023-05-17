const jwt = require('jsonwebtoken')

const EXPIRES = 7 * 86400 * 1000 // 7 days

module.exports = function (res, userId) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: EXPIRES
  })

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: EXPIRES
  })
}

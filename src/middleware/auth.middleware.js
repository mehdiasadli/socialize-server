const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

module.exports = async function (req, res, next) {
  let token
  token = req.cookies.jwt

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
      req.user = await User.findById(decoded.userId).select('-password')

      next()
    } catch (error) {
      next(error)
    }
  } else {
    next({ statusCode: 401, message: 'Unauthorized' })
  }
}

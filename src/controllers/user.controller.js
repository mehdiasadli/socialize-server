const User = require('../models/user.model')

async function getUser(req, res) {
  const data = {
    _id: req.user._id,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    username: req.user.username
  }

  return res
    .status(200)
    .json({ success: true, status: 200, message: 'User info sent successfully', data })
}

async function updateUser(req, res, next) {
  try {
    const user = await User.findById(req.user._id)

    if (user) {
      user.firstName = req.body.firstName || user.firstName
      user.lastName = req.body.lastName || user.lastName
      user.username = req.body.username || user.username

      if (req.body.password) {
        user.password = req.body.password
      }

      const updated = await user.save()
      res.status(200).json({
        success: true,
        status: 200,
        message: 'User updated successfully',
        data: {
          _id: updated._id,
          firstName: updated.firstName,
          lastName: updated.lastName,
          username: updated.username
        }
      })
    } else {
      next({ statusCode: 404, message: 'User not found' })
    }
  } catch (error) {
    next(error)
  }
}

module.exports = { getUser, updateUser }

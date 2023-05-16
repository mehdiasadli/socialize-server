const User = require('../models/user.model')

const DEFAULT_LIMIT = 1
const DEFAULT_SORT = -1
const DEFAULT_PAGE = 1

async function getUsers(req, res, next) {
  const isAll = req.query?.all ? req.query.all === 'true' : false
  const sort = req.query?.sort ? (req.query.sort === 'asc' ? 1 : -1) : DEFAULT_SORT

  let limit = parseInt(req.query.limit) || DEFAULT_LIMIT
  let page = parseInt(req.query.page) || DEFAULT_PAGE

  let skip = (page - 1) * limit

  try {
    const total = await User.find().countDocuments()
    if (isAll) {
      page = 1
      limit = total
      skip = 0
    }
    const users = await User.find().skip(skip).limit(limit).sort({ createdAt: sort })

    const totalPages = Math.ceil(total / limit)

    return res.status(200).json({
      success: true,
      status: 200,
      message: 'Users fetched successfully',
      data: users,
      page,
      itemsPerPage: limit,
      total,
      totalPages,
      isAll
    })
  } catch (error) {
    next(error)
  }
}

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

module.exports = { getUser, updateUser, getUsers }

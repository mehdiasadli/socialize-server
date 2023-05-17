const User = require('../models/user.model')
const cloudinary = require('../config/cloudinary.config')

const DEFAULT_LIMIT = 20
const DEFAULT_SORT = -1
const DEFAULT_PAGE = 1

const IMAGE_TYPES = {
  profile: { folder: 'profile_images', field: 'profile_image', name: 'Profile' },
  cover: { folder: 'cover_images', field: 'cover_image', name: 'Cover' }
}

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
      data: users.map((user) => user.getPublic()),
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
  return res.status(200).json({
    success: true,
    status: 200,
    message: 'User info sent successfully',
    data: req.user.getPublic()
  })
}

async function updateUser(req, res, next) {
  try {
    const user = await User.findById(req.user._id).select('-password')

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
        data: updated.getPublic()
      })
    } else {
      next({ statusCode: 404, message: 'User not found' })
    }
  } catch (error) {
    next(error)
  }
}

async function uploadImage(req, res, next) {
  const { image } = req.body
  const { type } = req.params // profile, cover

  try {
    const result = await cloudinary.uploader.upload(image, {
      folder: `socialize/${IMAGE_TYPES[type].folder}`
    })

    req.user[IMAGE_TYPES[type].field] = {
      public_id: result.public_id,
      url: result.secure_url
    }

    await req.user.save()
    return res.status(200).json({
      success: true,
      status: 200,
      message: `${IMAGE_TYPES[type].name} image uploaded successfully`,
      data: req.user.getPublic()
    })
  } catch (error) {
    next(error)
  }
}

async function deleteImage(req, res, next) {
  const { type } = req.params

  try {
    req.user[IMAGE_TYPES[type].field] = {}
    await req.user[IMAGE_TYPES[type].field].save()

    return res.status(200).json({
      success: true,
      status: 200,
      message: `${IMAGE_TYPES[type].name} image deleted successfully`,
      data: req.user.getPublic()
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getUser,
  updateUser,
  getUsers,
  uploadImage,
  deleteImage
}

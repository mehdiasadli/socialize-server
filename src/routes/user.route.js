const router = require('express').Router()

// Controllers
const {
  getUser,
  getUsers,
  updateUser,
  uploadImage,
  deleteImage
} = require('../controllers/user.controller')
// Middlewares
const { validate } = require('../middleware/validate.middleware')
// DTOs
const {
  updateUserDTO,
  uploadImageDTO,
  deleteImageDTO
} = require('../dto/user.dto')
const { paginationDTO } = require('../dto/common.dto')
// Routes
router.get('/', getUser)
router.put('/', validate(updateUserDTO), updateUser)
router.get('/all', validate(paginationDTO), getUsers)
router.put('/image/edit/:type', validate(uploadImageDTO), uploadImage)
router.put('/image/delete/:type', validate(deleteImageDTO), deleteImage)

module.exports = router

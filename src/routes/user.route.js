const router = require('express').Router()

// Controllers
const {
  getUser,
  getUsers,
  updateUser,
  uploadImage,
  deleteImage,
  getCurrentUser
} = require('../controllers/user.controller')
// Middlewares
const { validate } = require('../middleware/validate.middleware')
// DTOs
const { updateUserDTO, uploadImageDTO, deleteImageDTO } = require('../dto/user.dto')
const { paginationDTO, paramIdDTO } = require('../dto/common.dto')
// Routes
router.get('/', validate(paginationDTO), getUsers)
router.put('/', validate(updateUserDTO), updateUser)
router.get('/current', getCurrentUser)
router.get('/:id', validate(paramIdDTO), getUser)
router.put('/image/edit/:type', validate(uploadImageDTO), uploadImage)
router.put('/image/delete/:type', validate(deleteImageDTO), deleteImage)

module.exports = router

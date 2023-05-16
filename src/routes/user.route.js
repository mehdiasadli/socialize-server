const router = require('express').Router()

// Controllers
const { getUser, getUsers, updateUser } = require('../controllers/user.controller')
// Middlewares
const { validate } = require('../middleware/validate.middleware')
// DTOs
const { updateUserDTO } = require('../dto/user.dto')
const { paginationDTO } = require('../dto/common.dto')
// Routes
router.get('/all', validate(paginationDTO), getUsers)
router.get('/', getUser)
router.put('/', validate(updateUserDTO), updateUser)

module.exports = router

const router = require('express').Router()

// Controllers
const { getUser, getUsers, updateUser } = require('../controllers/user.controller')
// Middlewares
const { validate } = require('../middleware/validate.middleware')
// DTOs
const { getUsersDTO, updateUserDTO } = require('../dto/user.dto')
// Routes
router.get('/all', validate(getUsersDTO), getUsers)
router.get('/', getUser)
router.put('/', validate(updateUserDTO), updateUser)

module.exports = router

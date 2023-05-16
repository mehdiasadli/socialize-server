const router = require('express').Router()

// Controllers
const { signIn, signUp, signOut } = require('../controllers/auth.controller')
// Middlewares
const { validate } = require('../middleware/validate.middleware')
// DTOs
const { signInDTO, signUpDTO } = require('../dto/auth.dto')
//Routes
router.post('/signin', validate(signInDTO), signIn)
router.post('/signup', validate(signUpDTO), signUp)
router.post('/signout', signOut)

module.exports = router

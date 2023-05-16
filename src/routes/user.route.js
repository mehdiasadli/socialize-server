const router = require('express').Router()

const { getUser, updateUser } = require('../controllers/user.controller')

router.get('/', getUser)
router.put('/', updateUser)

module.exports = router

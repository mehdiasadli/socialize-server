const User = require('../models/user.model')
const capitalize = require('../lib/utils/capitalize')
const generateToken = require('../lib/utils/generateToken')
/**
 * @method POST
 * @route  /api/auth/signin
 * @desc   Signs in the user
 * @access Public
 */
async function signIn(req, res, next) {
  const { username, password } = req.body

  try {
    const user = await User.findOne({ username })

    if (user && (await user.matchPasswords(password, next))) {
      generateToken(res, user._id)
      return res.status(201).json({
        success: true,
        status: 200,
        message: 'User logged in successfully',
        data: {
          _id: user._id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName
        }
      })
    } else {
      next({ message: 'Invalid username or password', statusCode: 400 })
    }
  } catch (error) {
    next(error)
  }
}

/**
 * @method POST
 * @route  /api/auth/signup
 * @desc   Creates a new user
 * @access Public
 */
async function signUp(req, res, next) {
  const { firstName, lastName, username, password } = req.body

  try {
    const isUserExist = await User.findOne({ username })
    if (isUserExist) next({ statusCode: 400, message: 'Username already exists' })

    const user = new User({
      firstName: capitalize(firstName),
      lastName: capitalize(lastName),
      username: username.toLowerCase(),
      password
    })

    await user.save()
    if (user) {
      generateToken(res, user._id)
      return res.status(201).json({
        success: true,
        status: 200,
        message: 'User created successfully',
        data: {
          _id: user._id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName
        }
      })
    } else {
      next({})
    }
  } catch (error) {
    next(error)
  }
}

/**
 * @method POST
 * @route  /api/auth/signout
 * @desc   Signs out the user
 * @access Public
 */
async function signOut(req, res, next) {
  try {
    res.cookie('jwt', '', {
      httpOnly: true,
      expires: new Date(0)
    })

    return res
      .status(200)
      .json({ success: true, status: 200, message: 'User logged out successfully' })
  } catch (error) {
    next(error)
  }
}

module.exports = { signIn, signUp, signOut }

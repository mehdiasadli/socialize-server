const { Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs')

const userModel = new Schema(
  {
    firstName: { type: String, required: [true, 'First name is required'], trim: true },
    lastName: { type: String, required: [true, 'Last name is required'], trim: true },
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: [true, 'Username already in use'],
      trim: true
    },
    password: { type: String, required: [true, 'Password is required'], trim: true }
  },
  { timestamps: true }
)

userModel.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  try {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
  } catch (error) {
    next(error)
  }
})

userModel.methods.matchPasswords = async function (password, next) {
  try {
    return await bcrypt.compare(password, this.password)
  } catch (error) {
    next(error)
  }
}

module.exports = model('User', userModel)

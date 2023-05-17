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
    password: { type: String, required: [true, 'Password is required'], trim: true },
    profile_image: {
      public_id: { type: String, required: true },
      url: { type: String, required: true }
    },
    cover_image: {
      public_id: { type: String, required: true },
      url: { type: String, required: true }
    }
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

userModel.methods.getPublic = function () {
  const data = {
    _id: this._id,
    firstName: this.firstName,
    lastName: this.lastName,
    username: this.username,
    profile_image: this.profile_image,
    cover_image: this.cover_image,
    createdAt: this.createdAt
  }

  return data
}

module.exports = model('User', userModel)

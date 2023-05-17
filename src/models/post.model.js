const { Schema, model } = require('mongoose')

const postModel = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'Post owner is required'] },
    content: { type: String, trim: true },
    image: {
      public_id: { type: String },
      url: { type: String }
    },
    likes: [{ type: Schema.Types.ObjectId }]
  },
  { timestamps: true }
)

module.exports = model('Post', postModel)

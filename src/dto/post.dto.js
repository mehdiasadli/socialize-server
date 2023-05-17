const { z } = require('zod')

const createPostDTO = z.object({
  body: z
    .object({
      content: z.optional(
        z.string({
          invalid_type_error: 'Post content must be a string'
        })
      ),
      image: z.optional(
        z.string({
          invalid_type_error: 'Image must be a string'
        })
      )
    })
    .partial()
    .refine((values) => values.content || values.image, {
      message: 'Either image or post content must be specified'
    })
})

const updatePostDTO = z.object({
  body: z.object({
    content: z.optional(
      z.string({
        invalid_type_error: 'Post content must be a string'
      })
    )
  })
})

module.exports = { createPostDTO, updatePostDTO }

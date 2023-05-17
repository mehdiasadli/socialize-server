const { z } = require('zod')

const updateUserDTO = z.object({
  body: z.object({
    firstName: z.optional(
      z.string({
        invalid_type_error: 'First name must be a string'
      })
    ),
    lastName: z.optional(
      z.string({
        invalid_type_error: 'Last name must be a string'
      })
    ),
    username: z.optional(
      z.string({
        invalid_type_error: 'Username must be a string'
      })
    ),
    password: z.optional(
      z.string({
        invalid_type_error: 'Password must be a string'
      })
    )
  })
})

const uploadImageDTO = z.object({
  body: z.object({
    image: z.string({
      required_error: 'Image is required',
      invalid_type_error: 'Image must be a string'
    })
  }),
  params: z.object({
    type: z.enum(['profile', 'cover'], {
      required_error: 'Image type is required',
      invalid_type_error: 'Image type can be either "profile" or "cover"'
    })
  })
})

const deleteImageDTO = z.object({
  params: z.object({
    type: z.enum(['profile', 'cover'], {
      required_error: 'Image type is required',
      invalid_type_error: 'Image type can be either "profile" or "cover"'
    })
  })
})

module.exports = { updateUserDTO, uploadImageDTO, deleteImageDTO }

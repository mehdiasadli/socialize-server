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

module.exports = { updateUserDTO }

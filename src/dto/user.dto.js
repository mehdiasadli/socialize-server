const { z } = require('zod')

const getUsersDTO = z.object({
  query: z.object({
    page: z.optional(
      z.preprocess((value) => parseInt(z.string().parse(value), 10), z.number().positive())
    ),
    limit: z.optional(
      z.preprocess((value) => parseInt(z.string().parse(value), 10), z.number().positive())
    ),
    all: z.optional(z.string()),
    sort: z.optional(z.enum(['asc', 'desc'], {
        invalid_type_error: 'Sort must be either "asc" or "desc"'
    }))
  })
})

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

module.exports = { getUsersDTO, updateUserDTO }

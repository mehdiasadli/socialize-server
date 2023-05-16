const { z } = require('zod')

const signInDTO = z.object({
  body: z.object({
    username: z.string({
      required_error: 'Username is required'
    }),
    password: z.string({
      required_error: 'Password is required'
    })
  })
})

const signUpDTO = z.object({
  body: z.object({
    firstName: z.string({
      required_error: 'First name is required',
      invalid_type_error: 'First name must be a string'
    }),
    lastName: z.string({
      required_error: 'Last name is required',
      invalid_type_error: 'Last name must be a string'
    }),
    username: z.string({
      required_error: 'Username is required',
      invalid_type_error: 'Username must be a string'
    }),
    password: z.string({
      required_error: 'Password is required',
      invalid_type_error: 'Password must be a string'
    })
  })
})

module.exports = { signInDTO, signUpDTO }

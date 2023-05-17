const { z } = require('zod')
const mongoose = require('mongoose')

const paramIdDTO = z.object({
  params: z.object({
    id: z
      .string({ required_error: 'Id is required' })
      .refine((value) => mongoose.Types.ObjectId.isValid(value), {
        message: 'Id is invalid'
      })
  })
})

const paginationDTO = z.object({
  query: z.object({
    page: z.optional(
      z.preprocess((value) => parseInt(z.string().parse(value), 10), z.number().positive())
    ),
    limit: z.optional(
      z.preprocess((value) => parseInt(z.string().parse(value), 10), z.number().positive())
    ),
    all: z.optional(
      z.enum(['true', 'false'], {
        invalid_type_error: 'All must be either "true" or "false"'
      })
    ),
    sort: z.optional(
      z.enum(['asc', 'desc'], {
        invalid_type_error: 'Sort must be either "asc" or "desc"'
      })
    )
  })
})

module.exports = { paginationDTO, paramIdDTO }

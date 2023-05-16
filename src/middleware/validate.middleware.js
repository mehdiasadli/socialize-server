const validate = (schema) => async (req, _, next) => {
  try {
    await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params
    })

    return next()
  } catch (err) {
    next({ message: err.issues[0].message, statusCode: 400 })
  }
}

module.exports = { validate }

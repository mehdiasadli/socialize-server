const DEFAULT_ERR_MESSAGE = 'Something went wrong'

function handleError(err, req, res, next) {
  const status = err.statusCode || 500
  const message = err.message || DEFAULT_ERR_MESSAGE
  res.status(status).json({
    success: false,
    status,
    message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : null
  })
}

module.exports = handleError

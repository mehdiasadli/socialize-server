const CLIENT_ORIGINS = {
  development: 'http://localhost:5173',
  production: null
}

module.exports = CLIENT_ORIGINS[process.env.NODE_ENV]

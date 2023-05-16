// Imports
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
// Configs
require('dotenv').config()
const { connectToDB } = require('./src/config/db.config')
// Middleware
const handleError = require('./src/middleware/error.middleware')
const verifyToken = require('./src/middleware/auth.middleware')

// Init. express app
const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Connect to the Database
connectToDB()

// Routes
const routes = require('./src/lib/resources/routes')

const authRoute = require('./src/routes/auth.route')
const userRoute = require('./src/routes/user.route')

app.use(routes.auth, authRoute)
app.use(routes.user, verifyToken, userRoute)
// 404 Route
app.all('*', (_, res) =>
  res.status(404).json({ success: false, status: 404, message: 'Page not found' })
)
// Error handler Middleware
app.use(handleError)

// Listen the server
const port = process.env.PORT || 7575
app.listen(port, () => console.log('Listening on Port: ' + port))

// Export app for vercel
module.exports = app

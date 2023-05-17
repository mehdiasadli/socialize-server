// Imports
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
// Configs
const CORS_CONFIG = require('./src/config/cors')
const connectToDB = require('./src/config/db.config')

require('dotenv').config()
// Middleware
const handleError = require('./src/middleware/error.middleware')
const verifyToken = require('./src/middleware/auth.middleware')

// Init. express app
const app = express()

// Middleware
app.use(morgan('combined'))
app.use(cors(CORS_CONFIG))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Connect to the Database
connectToDB()

// Routes
const routes = require('./src/lib/resources/routes')

const authRoute = require('./src/routes/auth.route')
const userRoute = require('./src/routes/user.route')
const postRoute = require('./src/routes/post.route')

app.use(routes.auth, authRoute)
app.use(routes.user, verifyToken, userRoute)
app.use(routes.post, verifyToken, postRoute)
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

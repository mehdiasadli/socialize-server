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
app.use('/api/user', verifyToken, require('./src/routes/user.route'))
app.use('/api/auth', require('./src/routes/auth.route'))
// app.use(paths.user, verifyToken, require('./src/routes/user.route'))
// app.use(paths.coll, verifyToken, require('./src/routes/collection.route'))
// app.use(paths.blog, verifyToken, require('./src/routes/blog.route'))
// app.use(paths.comm, verifyToken, require('./src/routes/comment.route'))

app.use(handleError)

// Listen the server
const port = process.env.PORT || 7575
app.listen(port, () => console.log('Listening on Port: ' + port))

// Export app for vercel
module.exports = app

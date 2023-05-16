const { connect } = require('mongoose')

const connectToDB = () => {
  const db = process.env.DB_URI
  connect(db)
}

module.exports = { connectToDB }

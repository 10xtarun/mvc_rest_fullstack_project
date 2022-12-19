const mongoose = require('mongoose')

const URI = ''

const connectDb = () => {
  mongoose.set('strictQuery', false)
  mongoose.connect(URI, (error) => {
    if (error) throw error
    console.log('database connection established')
  })
  return true
}

module.exports = connectDb

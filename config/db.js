const mongoose = require('mongoose')

const connectDb = () => {
  mongoose.set('strictQuery', false)
  mongoose.connect(process.env.MONGO_URI, (error) => {
    if (error) throw error
    console.log('database connection established')
  })
  return true
}

module.exports = connectDb

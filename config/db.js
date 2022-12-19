const mongoose = require('mongoose')

const URI = 'mongodb+srv://10xtarun:10xtarun@cluster0.f3zruyr.mongodb.net/?retryWrites=true&w=majority'

const connectDb = () => {
  mongoose.set('strictQuery', false)
  mongoose.connect(URI, (error) => {
    if (error) throw error
    console.log('database connection established')
  })
  return true
}

module.exports = connectDb

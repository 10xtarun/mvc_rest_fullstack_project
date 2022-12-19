const { Schema, model } = require('mongoose')

const User = new Schema({
  name: String,
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  }
})

module.exports = model('users', User)

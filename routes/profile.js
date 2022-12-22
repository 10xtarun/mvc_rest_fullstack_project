const { Router } = require('express')
const Users = require('../models/users')
const verifyAuthentication = require('../middlewares/verifyAuthentication')

const profileRouter = Router()

profileRouter.get('/', verifyAuthentication,(req, res) => {
  return Users.findOne({})
    .then(data => {
      if (!data) {
        throw Error('user not found')
      }

      data = data.toJSON()
      delete data.password
      delete data.otp
      delete data._id
      delete data.__v

      return res.status(200).json({
        message: 'profile fetch successfully',
        data
      })
    })
    .catch(error => {
      return res.status(422).json({
        message: 'profile fetched failed',
        error: error.message || error.toString()
      })
    })
})

module.exports = profileRouter

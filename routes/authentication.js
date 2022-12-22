const { Router } = require('express')
const { registerUser } = require('../controllers/authentication')
const Users = require('../models/users')
// const verifyAuthentication = require('../middlewares/verifyAuthentication')

const authRouter = Router()

authRouter.post('/login', (req, res) => {
  let user
  return Users.findOne({ email: req.body.email })
    .then(data => {
      if (!data) {
        throw Error('user not found')
      }
      user = data.toJSON()
      delete user.password
      delete user.otp

      return utils.compare(req.body.password, data.password)
    })
    .then(match => {
      if (!match) {
        throw Error('password is invalid')
      }

      return res.status(200).json({
        message: 'login successful',
        data: user
      })
    })
    .catch(error => {
      return res.status(422).json({
        message: 'login failed',
        error: error.message ? error.message : error.toString()
      })
    })
})

authRouter.post('/register', registerUser)

authRouter.post('/verify_email', (req, res) => {
  return Promise.resolve()
    .then(() => {

    })
})

module.exports = authRouter

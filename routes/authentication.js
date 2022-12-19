const { Router } = require('express')
const Users = require('../models/users')

const authRouter = Router()

authRouter.post('/login', (req, res) => {
  return res.status(200).json({
    message: 'login successful'
  })
})

authRouter.post('/register', (req, res) => {
  console.log('------ ', req.body)
  const newUser = req.body

  return Users.create(newUser)
    .then(() => {
      return res.status(200).json({
        message: 'login successful'
      })
    })
    .catch(error => {
      return res.status(422).json({
        message: 'registaration failed',
        error: error.message ? error.message : error.toString()
      })
    })
})

module.exports = authRouter

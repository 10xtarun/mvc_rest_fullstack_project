
const Users = require('../models/users')
const { createJWTToken } = require('../utils')
// const { generateOTP } = require('../utils')

const registerUser = (req, res) => {
  const newUser = req.body

  return Promise.resolve()
    .then(() => {
      if (!(newUser.email && newUser.password)) {
        throw Error('email or password not provided')
      }
      return utils.encrypt(newUser.password)
    })
    .then(hash => {
      newUser.password = hash
      return Users.create(newUser)
    })
    .then(data => {
      if (!data) {
        throw Error('user registaration failed')
      }
      data = data.toJSON()
      delete data.password

      data.access_token = createJWTToken(data.email)

      return res.status(200).json({
        message: 'registaration successful',
        data
      })
    })
    .catch(error => {
      return res.status(422).json({
        message: 'registaration failed',
        error: error.message ? error.message : error.toString()
      })
    })
}

module.exports = {
  registerUser
}

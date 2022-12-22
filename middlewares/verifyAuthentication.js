const jwt = require('jsonwebtoken')
const { JWTSecret } = require('../constants')

module.exports = (req, res, next) => {
  const accessToken = req.headers.authorization

  if (accessToken) {
    jwt.verify(accessToken, JWTSecret, function (error, decoded) {
      if (error) {
        if (error.name === 'TokenExpiredError') {
          return res.status(401).json({
            message: 'unauthorized',
            error: 'login expired'
          })
        }
        return res.status(401).json({
          message: 'unauthorized',
          error: 'unauthorized access'
        })
      }

      req.email = decoded
      next()
    })
  } else {
    return res.status(401)
      .json({
        message: 'unauthorized',
        error: 'unauthorized access'
      })
  }
}

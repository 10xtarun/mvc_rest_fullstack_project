
const bcrypt = require('bcrypt')
const otpGenerator = require('otp-generator')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const { saltRounds, OTPLength, OTPConfig, mailSettings, JWTSecret } = require('./constants')

const shutDownHandler = (server) => {
  if (server) {
    console.info('initiating graceful server shutdown')
    server.close(() => {
      console.log('server closed')
      if (global.app && global.app.db) {
        global.app.db.connection.close(false, () => console.info('database connection closed'))
      }
      process.exit(0)
    })
    return
  }
  console.warn('initiating hard server shutdown')
  process.exit(1)
}

const gracefulShutdown = (server) => {
  process.on('SIGINT', () => {
    console.error('SIGINT signal recieved')
    shutDownHandler(server)
  })
  process.on('SIGTERM', () => {
    console.error('SIGTERM signal recieved')
    shutDownHandler(server)
  })
}

/**
 * @param {String} text
 * @returns hash
 */
const encrypt = (text) => {
  return bcrypt.genSalt(saltRounds)
    .then(salt => bcrypt.hash(text, salt))
}

/**
 * @param {String} text
 * @param {String} hash
 * @returns
 */
const compare = (text, hash) => {
  return bcrypt.compare(text, hash)
}

const generateOTP = () => {
  return otpGenerator.generate(OTPLength, OTPConfig)
}

const mailer = (emailId, otp) => {
  return Promise.resolve()
    .then(() => {
      const transporter = nodemailer.createTransport(mailSettings)
      return transporter.sendMail({
        from: mailSettings.auth.user,
        to: emailId,
        subject: `Email Verification from Express App`,
        html: `
      <div>
      <h2>Hello From Express App!</h2>
      <h3>Here is your OTP for Email Verification</h3>
      <br />
      <strong>${otp}</strong>
      <br />
      <p>Thank You!</p>
      </div>
      `
      })
    })
}

const createJWTToken = (emailId) => {
  return jwt.sign({
    exp: '1 hour',
    data: emailId
  }, JWTSecret)
}

module.exports = {
  shutDownHandler,
  gracefulShutdown,
  encrypt,
  compare,
  generateOTP,
  mailer,
  createJWTToken
}

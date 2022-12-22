module.exports = {
  saltRounds: 10,
  OTPLength: 6,
  OTPConfig: {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false
  },
  mailSettings: {
    service: 'gmail',
    auth: {
      user: process.env.MAIL_EMAIL,
      pass: process.env.MAIL_PASSWORD
    }
  },
  JWTSecret: 'somesecret@123'
}

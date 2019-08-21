const cookie = require('cookie')
const jwt = require('jsonwebtoken')
const { promisify } = require('util')

exports.isAuthenticated = async (req, res, next) => {
  // get jwt

  if (!req.headers.cookie) {
    res.redirect(302, '/signin')
  } else if (req.headers.cookie.match(/jwt/)) {
    const parsedCookie = cookie.parse(req.headers.cookie)

    // verify jwt
    const auth = await promisify(jwt.verify)(
      parsedCookie.jwt,
      process.env.JWT_SECRET
    )

    // if not verified then go to the signin page
    if (!auth) {
      console.log('errrrrrrrrrrror')

      res.redirect(302, '/signin')
    }

    next()
  }
}

const cookie = require('cookie')
const jwt = require('jsonwebtoken')
const { promisify } = require('util')

exports.isAuthenticated = async (req, res, next) => {
  // get jwt
  console.log('IN AUTHHHHHHHHHHHHHHHHH')
  if (!req.headers.cookie) {
    console.log('no cookie, we need to redirect')
    res.redirect(302, '/signin')
  } else if (req.headers.cookie.match(/jwt/)) {
    console.log('there is a jwt')
    const parsedCookie = cookie.parse(req.headers.cookie)

    // verify jwt
    const auth = await promisify(jwt.verify)(
      parsedCookie.jwt,
      process.env.JWT_SECRET
    )
    console.log('auth', auth)

    // if not verified then go to the signin page
    if (!auth) {
      console.log('errrrrrrrrrrror')

      res.redirect(302, '/signin')
    }

    next()
  }
}

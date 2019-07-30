const cookie = require('cookie')
const jwt = require('jsonwebtoken')

exports.isAuthenticated = async (req, res, next) => {
  // get jwt
  if (!req.headers.cookie) {
    console.log('no cookie, we need to redirect')
    res.redirect(302, 'http://www.google.com')
  } else if (req.headers.cookie.match(/jwt/)) {
    const parsedCookie = cookie.parse(req.headers.cookie)

    // verify jwt
    const auth = await jwt.verify(parsedCookie.jwt, process.env.JWT_SECRET)

    // if not verified then go to the signin page
    if (!auth) {
      console.log('errrrrrrrrrrror')

      res.redirect(302, '/signin')
    }

    // if verified then continue
    console.log('we are here')

    next()
  }
}

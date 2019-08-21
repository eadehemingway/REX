const jwt = require('jsonwebtoken')
const path = require('path')
const User = require('../models/users')
const bcrypt = require('bcryptjs')

exports.getLandingPage = (req, res) => {
  res.sendFile(path.join(__dirname, '../public/dist/index.html'))
}

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find()

    res.status(200).json({
      status: 'success',
      result: users.length,
      data: {
        users
      }
    })
  } catch (err) {
    console.log(err)
  }
}
exports.createUser = async (req, res) => {
  try {
    const password = await bcrypt.hash(req.body.password, 12)
    const newUser = await User.create({
      handle: req.body.handle,
      email: req.body.email,
      password: password
    })
    res.status(200).json({
      status: 'success',
      data: {
        newUser
      }
    })
  } catch (err) {
    res.send('error creating user')
  }
}

exports.getUser = (req, res) => {
  const { handle } = req.params
  const loggedInUserHandle = req.cookies.user

  User.findOne({ handle }, (err, doc) => {
    if (err) console.log('err', err)
    if (!doc) return
    const { films } = doc
    const favourtiesAndRex = { films, rex: doc.receivedRex }
    const info = handle === loggedInUserHandle ? favourtiesAndRex : films
    res.json({ doc: info })
  })
}

exports.validateUser = async (req, res) => {
  const { handle, password } = req.body
  const user = await User.findOne({ handle })

  if (!user || !(await user.correctPassword(password, user.password))) {
    res.send('no user found')
    return
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  })

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  }
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true
  res.cookie('jwt', token, cookieOptions)
  res.cookie('user', handle)

  res.status(200).json({
    status: 'success',
    token,
    user
  })
}

exports.signOut = (req, res) => {
  res.clearCookie('jwt')
  res.clearCookie('user')
  delete req.session
  res.json({ signOut: true })
}

const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const tagSchema = new mongoose.Schema({
  name: String,
  colour: String
})
const rexSchema = new mongoose.Schema({
  title: String,
  fromHandle: String,
  comment: String,
  pending: Boolean
})

const filmSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Film name is required'],
    trim: true
  },
  poster_path: String,
  tag: [tagSchema]
})

const userSchema = new mongoose.Schema({
  handle: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'please enter your password']
  },
  films: [filmSchema],
  receivedRex: [rexSchema]
})

userSchema.methods.correctPassword = async function(userPassword, dbPassword) {
  return await bcrypt.compare(userPassword, dbPassword)
}
const User = mongoose.model('User', userSchema)
module.exports = User

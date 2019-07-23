const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
  name: String,
  colour: String
});
const rexSchema = new mongoose.Schema({
  title: String,
  from: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  comment: String,
  pending: Boolean
});

const filmSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Film name is required'],
    trim: true
  },
  tag: [tagSchema]
});

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
  favourites: {
    films: [filmSchema]
  },
  receivedRex: [rexSchema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;

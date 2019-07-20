const mongoose = require('mongoose')

const filmSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Film name is required'],
    trim: true
  }
})

const Film = mongoose.model('Film', filmSchema)

module.exports = Film

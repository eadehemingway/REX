const mongoose = require('mongoose')

const recommendationsSchema = new mongoose.Schema({
  movie: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
    required: [true, 'Film name is required'],
    trim: true
  },
  senderId: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  reviewId: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  comment: {
    type: String,
    trim: true
  }
})

const Recommendation = mongoose.model('Recommendation', recommendationsSchema)

module.exports = Recommendation

const express = require('express')
const { getProfile, search } = require('./controllers/profile')

const router = express.Router()

router.get('/api/profile', getProfile).get('/api/search/:word', search)

module.exports = router

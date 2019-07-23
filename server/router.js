const express = require('express');
const {
  getProfile,
  search,
  createUser,
  getAllUsers
} = require('./controllers/users');

const router = express.Router();

router.get('/api/v1/profile', getProfile).get('/api/search/:word', search);
router.post('/api/v1/user/signup', createUser);
router.get('/api/v1/user', getAllUsers);

module.exports = router;

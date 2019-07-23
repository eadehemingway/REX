const express = require('express');
const {
  getUser,
  search,
  createUser,
  getAllUsers
} = require('./controllers/users');

const router = express.Router();

router.get('/api/v1/user', getUser);
router.get('/api/user/:handle', search);
router.post('/api/v1/user/signup', createUser);
router.get('/api/v1/user', getAllUsers);

module.exports = router;

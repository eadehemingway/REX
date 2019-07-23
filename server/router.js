const express = require('express');
const {
  getProfile,
  search,
  createUser,
  getAllUsers
} = require('./controllers/profile');
const { createTag } = require('./controllers/tags');
const { getAllFilms, createFilm } = require('./controllers/film');

const router = express.Router();

router.get('/api/v1/profile', getProfile).get('/api/search/:word', search);
router.post('/api/v1/user/signup', createUser);
router.post('/api/v1/tag', createTag);
router.post('/api/v1/film', createFilm);
router.get('/api/v1/film', getAllFilms);
router.get('/api/v1/user', getAllUsers);

module.exports = router;

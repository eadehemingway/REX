const express = require('express');
const { getUser, createUser, getAllUsers } = require('./controllers/users');

const router = express.Router();

router.get('/api/user/:handle', getUser);
router.post('/api/user/signup', createUser);
// router.patch('/api/user/film', updateFavFilms);
// router.patch('/api/user/film/tag', updateFilmTags);
// router.patch('/api/user/rex', updateRex);

module.exports = router;

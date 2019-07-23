const express = require('express');
const {
  getUser,
  createUser,
  addFavFilm,
  getAllUsers,
  deleteFavFilm
} = require('./controllers/users');

const router = express.Router();

router.get('/api/user/:handle', getUser);
router.get('/api/user', getAllUsers);
router.post('/api/user/signup', createUser);
// router.post('/api/user/signin', validateUser);
router.patch('/api/film', addFavFilm);
router.delete('/api/film/:id', deleteFavFilm);
// router.patch('/api/film/:id/tag', addTagFilms);
// router.delete('/api/film/:id/tag', removeTagFilms);
// router.patch('/api/rex', addRex)
// router.delete('/api/rex/:id', addRex)
// router.patch('/api/rex/:id/status', addRex)

module.exports = router;

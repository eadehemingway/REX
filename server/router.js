const express = require('express')
const {
  getUser,
  createUser,
  getAllUsers,
  validateUser,
  getHome
} = require('./controllers/users')
const {
  addFavFilm,
  deleteFavFilm,
  addTagFilms,
  removeTagFilms,
  getFilm
} = require('./controllers/films')

const { addRex, deleteRex, changeRexStatus } = require('./controllers/rex')
const { isAuthenticated } = require('./middlewares/auth')

const router = express.Router()

router.get('/', getHome)
router.get('/api/user/:handle', isAuthenticated, getUser)
router.get('/api/user', getAllUsers)
router.post('/api/user/signup', createUser)
router.post('/api/user/signin', validateUser)
router.get('/api/film/:title', isAuthenticated, getFilm)
router.patch('/api/film', isAuthenticated, addFavFilm)
router.delete('/api/film/:id', isAuthenticated, deleteFavFilm)
router.patch('/api/film/:id/tag', isAuthenticated, addTagFilms)
router.delete('/api/film/:id/tag/:tagid', isAuthenticated, removeTagFilms)
router.patch('/api/rex', isAuthenticated, addRex)
router.delete('/api/rex/:id', isAuthenticated, deleteRex)
router.patch('/api/rex/:id/status', isAuthenticated, changeRexStatus)

module.exports = router

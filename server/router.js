const express = require('express')
const {
  getUser,
  createUser,
  getAllUsers,
  validateUser,
  getLandingPage,
  signOut
} = require('./controllers/users')
const {
  AddSmallFilm,
  deleteFavFilm,
  addTagFilms,
  removeTagFilms,
  getFilm
} = require('./controllers/films')

const { addRex, deleteRex, changeRexStatus } = require('./controllers/rex')
const { isAuthenticated } = require('./middlewares/auth')

const router = express.Router()

router.get('/', getLandingPage)
router.get('/api/user/all/:handle', getAllUsers) // we want to get all users that match the handle
router.post('/api/user/signup', createUser)
router.get('/api/user/signout', signOut)
router.get('/api/user/:handle', getUser)
router.post('/api/user/signin', validateUser)
router.get('/api/film/:title', isAuthenticated, getFilm)
router.patch('/api/film', isAuthenticated, AddSmallFilm)
router.delete('/api/film/:filmid', isAuthenticated, deleteFavFilm)
router.patch('/api/film/:id/tag', isAuthenticated, addTagFilms)
router.delete('/api/film/:id/tag/:tagid', isAuthenticated, removeTagFilms)
router.patch('/api/rex', isAuthenticated, addRex)
router.delete('/api/rex/:id', isAuthenticated, deleteRex)
router.patch('/api/rex/:id/status', isAuthenticated, changeRexStatus)

module.exports = router

const request = require('request')
const User = require('./../models/users')

exports.addFavFilm = (req, res) => {
  const { handle, filmInfo } = req.body

  User.findOne({ handle }, (err, doc) => {
    if (err) console.log('err', err)
    doc.films.push(filmInfo)
    doc.save()
    res.json({ doc })
  })
}

exports.deleteFavFilm = (req, res) => {
  const { id } = req.params

  User.findOne({ handle: 'eade' }, (err, doc) => {
    const filmArr = doc.films
    const index = filmArr.findIndex(e => e.id === id)
    filmArr.splice(index, 1)
    doc.save()
    res.json({ doc })
  })
}

exports.addTagFilms = (req, res) => {
  const { tag } = req.body

  const filmId = req.params.id
  const handle = 'eade' // get from cookies
  User.findOne({ handle }, (err, doc) => {
    if (err) console.log('err', err)

    const filmArr = doc.films
    const index = filmArr.findIndex(e => e.id === filmId)

    if (filmArr.length > 0) {
      filmArr[index].tag.push(tag)
    }

    doc.save()
    res.json({ doc })
  })
}

exports.removeTagFilms = (req, res) => {
  const { tagId } = req.params
  const filmId = req.params.id
  const handle = 'eade' // get from cookies
  User.findOne({ handle }, (err, doc) => {
    if (err) console.log('err', err)

    const filmArr = doc.films
    const index = filmArr.findIndex(e => e.id === filmId)
    const filmToAlter = filmArr[index]
    const tagIndex = filmToAlter.tag.findIndex(t => t.id === tagId)
    filmToAlter.tag.splice(tagIndex, 1)

    doc.save()
    res.json({ doc })
  })
}

exports.getFilm = (req, res) => {
  const { title } = req.params

  request.get(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&query=${title}`,
    (err, response, body) => {
      if (err) console.log(err)
      const data = JSON.parse(body).results

      const filmInfo = data
        .map(({ title, poster_path }) => ({ title, poster_path }))
        .filter(t => t.title.startsWith(title[0].toUpperCase()))
        .slice(0, 5)
      res.status(200).json({
        status: 'success',
        filmInfo
      })
    }
  )
}

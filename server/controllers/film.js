const Film = require('../models/films');

exports.getAllFilms = async (req, res) => {
  try {
    const films = await Film.find();

    res.status(200).json({
      status: 'success',
      results: films.length,
      data: {
        films
      }
    });
  } catch (err) {
    console.log(err);
  }
};

exports.createFilm = async (req, res) => {
  try {
    const newFilm = await Film.create({
      name: req.body.name
    });
    res.status(200).json({
      status: 'success',
      data: {
        newFilm
      }
    });
  } catch (err) {
    console.log(err);
  }
};

const User = require('../models/users');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      status: 'success',
      result: users.length,
      data: {
        users
      }
    });
  } catch (err) {
    console.log(err);
  }
};
exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create({
      handle: req.body.handle,
      email: req.body.email,
      favourites: {
        films: req.body.favourites.films
      },
      receivedRex: req.body.receivedRex
    });
    res.status(200).json({
      status: 'success',
      data: {
        newUser
      }
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getUser = (req, res) => {
  const { handle } = req.params;
  if (handle === 'Jem') {
    res.json({
      age: '25'
    });
  } else if (handle === 'eade') {
    res.json({
      age: '26'
    });
  } else {
    res.json({ age: 10 });
  }
};

exports.addFavFilm = (req, res) => {
  const filmInfo = req.body;
  const handle = 'eade'; // get from cookie once sign in working

  User.findOne({ handle: 'eade' }, (err, doc) => {
    if (err) console.log('err', err);
    doc.favourites.films.push(filmInfo);
    doc.save();
    res.json({ doc });
  });
};

exports.deleteFavFilm = (req, res) => {
  const { id } = req.params;

  User.findOne({ handle: 'eade' }, (err, doc) => {
    const filmArr = doc.favourites.films;
    const index = filmArr.findIndex(e => e.id === id);
    filmArr.splice(index, 1);
    doc.save();
    res.json({ doc });
  });
};

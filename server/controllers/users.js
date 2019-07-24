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
  User.findOne({ handle }, (err, doc) => {
    if (err) console.log('err', err);
    doc.save();
    res.json({ doc });
  });
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

exports.addRex = (req, res) => {
  const reqInfo = req.body.rex;
  const handle = req.body.toHandle; // in the body have the handle of who you want to send rec to.
  User.findOne({ handle: handle }, (err, doc) => {
    if (err) console.log('err', err);
    doc.receivedRex.push(reqInfo);
    doc.save();
    res.json({ doc });
  });
};

exports.deleteRex = (req, res) => {
  const { id } = req.params;
  const handle = 'eade'; // get from cookies
  User.findOne({ handle }, (err, doc) => {
    if (err) console.log('err', err);

    const rexArr = doc.receivedRex;
    const index = rexArr.findIndex(e => e.id === id);
    rexArr.splice(index, 1);

    doc.save();
    res.json({ doc });
  });
};

exports.addTagFilms = (req, res) => {
  const { tag } = req.body;

  const filmId = req.params.id;
  const handle = 'eade'; // get from cookies
  User.findOne({ handle }, (err, doc) => {
    if (err) console.log('err', err);

    const filmArr = doc.favourites.films;
    const index = filmArr.findIndex(e => e.id === filmId);

    if (filmArr.length > 0) {
      filmArr[index].tag.push(tag);
    }

    doc.save();
    res.json({ doc });
  });
};

exports.removeTagFilms = (req, res) => {
  const { tagId } = req.params;
  const filmId = req.params.id;
  const handle = 'eade'; // get from cookies
  User.findOne({ handle }, (err, doc) => {
    if (err) console.log('err', err);

    const filmArr = doc.favourites.films;
    const index = filmArr.findIndex(e => e.id === filmId);
    const filmToAlter = filmArr[index];
    const tagIndex = filmToAlter.tag.findIndex(t => t.id === tagId);
    filmToAlter.tag.splice(tagIndex, 1);

    doc.save();
    res.json({ doc });
  });
};

exports.changeRexStatus = (req, res) => {
  const { id } = req.params;
  const { pendingStatus } = req.body;
  const handle = 'eade'; // get from cookies
  User.findOne({ handle }, (err, doc) => {
    if (err) console.log('err', err);

    const rexArr = doc.receivedRex;
    const index = rexArr.findIndex(e => e.id === id);
    rexArr[index].pending = pendingStatus;

    doc.save();
    res.json({ doc });
  });
};

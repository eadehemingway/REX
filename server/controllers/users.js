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

exports.getProfile = (req, res) => {
  const object = {
    name: 'shahenaz',
    age: '25'
  };
  res.json(object);
};

exports.search = (req, res) => {
  const { word } = req.params;
  if (word === 'Jem') {
    res.json({
      age: '25'
    });
  } else if (word === 'eade') {
    res.json({
      age: '26'
    });
  } else {
    res.json({ age: 10 });
  }
};

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

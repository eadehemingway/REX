const Tag = require('../models/tags');

exports.createTag = async (req, res) => {
  try {
    const newTag = await Tag.create({
      name: req.body.name
    });
    res.status(200).json({
      status: 'success',
      data: {
        newTag
      }
    });
  } catch (err) {
    console.log(err);
  }
};

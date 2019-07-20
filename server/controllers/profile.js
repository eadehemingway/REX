exports.getProfile = (req, res) => {
  const object = {
    name: 'shahenaz',
    age: '25'
  }
  res.json(object)
}

exports.search = (req, res) => {
  const { word } = req.params
  if (word === 'Jem') {
    res.json({
      age: '25'
    })
  } else if (word === 'eade') {
    res.json({
      age: '26'
    })
  } else {
    res.json({ age: 10 })
  }
}

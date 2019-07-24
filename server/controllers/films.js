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

import React from 'react'

export class FavouriteFilms extends React.Component {
  render() {
    const { films, deleteFilm, editMode } = this.props
    console.log(films)
    return (
      <div>
        <h2> my films</h2>
        {films.map(({ title, poster_path, _id, tag }) => (
          <div key={poster_path}>
            <img src={`https://image.tmdb.org/t/p/w185/${poster_path}`} />
            <p>{title}</p>
            {tag.length > 0 &&
              tag.map((t, i) => (
                <p key={i} style={{ background: t.colour }}>
                  {t.name}{' '}
                </p>
              ))}

            {editMode && (
              <button onClick={() => deleteFilm(_id)}>delete</button>
            )}
          </div>
        ))}
      </div>
    )
  }
}

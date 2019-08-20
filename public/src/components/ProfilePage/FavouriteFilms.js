import React from 'react';

export class FavouriteFilms extends React.Component {
  render() {
    const { films, deleteFilm } = this.props;

    return (
      <div>
        <h2> my films</h2>
        {films.map(({ title, poster_path, _id }) => (
          <div key={poster_path}>
            <img src={`https://image.tmdb.org/t/p/w185/${poster_path}`} />
            <p>{title}</p>
            <button onClick={() => deleteFilm(_id)}>delete</button>
          </div>
        ))}
      </div>
    );
  }
}

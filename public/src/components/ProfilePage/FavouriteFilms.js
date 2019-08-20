import React from 'react';

export class FavouriteFilms extends React.Component {
  render() {
    const { films } = this.props;

    return (
      <div>
        <h2> my films</h2>
        {films.map(({ title, poster_path }) => (
          <div key={title}>
            <img src={`https://image.tmdb.org/t/p/w185/${poster_path}`} />
            <p>{title}</p>
          </div>
        ))}
      </div>
    );
  }
}

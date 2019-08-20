import React from 'react'

export class FavouriteFilms extends React.Component {
  toggleDropDown = () => {
    this.setState({ showAddFilmDropDown: !this.state.showAddFilmDropDown })
  }

  render() {
    return (
      <div>
        <h2> my films</h2>
        {this.props.films.map(({ title, poster_path }) => (
          <div key={title}>
            <img src={`https://image.tmdb.org/t/p/w185/${poster_path}`} />
            <p>{title}</p>
          </div>
        ))}
        <button onClick={this.toggleDropDown}> add new</button>
      </div>
    )
  }
}

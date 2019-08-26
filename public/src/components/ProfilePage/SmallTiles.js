import React from 'react'
import './style.css'

export class SmallTiles extends React.Component {
  render() {
    const { films } = this.props
    return (
      <div className="small-tile-section">
        <h2>SMALL TILES</h2>
        <div className="small-tile-container">
          {films.map((f, i) => (
            <img
              key={i}
              className="small-film-img"
              src={`https://image.tmdb.org/t/p/w185/${f.poster_path}`}
            />
          ))}
        </div>
      </div>
    )
  }
}

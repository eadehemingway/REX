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
            <div className="cropped-to-square" key={i}>
              <img
                className="small-film-img"
                src={`https://image.tmdb.org/t/p/w185/${f.poster_path}`}
              />
            </div>
          ))}
        </div>
      </div>
    )
  }
}

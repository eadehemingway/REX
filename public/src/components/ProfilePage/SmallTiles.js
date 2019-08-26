import React from 'react'
import './style.css'
import { AddFavFilm } from './AddFavFilm'

export class SmallTiles extends React.Component {
  state = {
    addFilmPanelOpen: false
  }
  toggleAddPanel = () => {
    this.setState(prevState => ({
      addFilmPanelOpen: !prevState.addFilmPanelOpen
    }))
  }
  addFilm = e => {
    this.setState({ addFilmPanelOpen: false })
    this.props.addFilm(e)
  }
  render() {
    const { films, editMode } = this.props
    const { addFilmPanelOpen } = this.state
    return (
      <div className="small-tile-section">
        <h2>SMALL TILES</h2>
        {editMode && <button onClick={this.toggleAddPanel}> Add</button>}
        {addFilmPanelOpen && <AddFavFilm addFilm={this.addFilm} />}
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

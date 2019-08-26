import React from 'react'
import './style.css'
import { AddFavFilm } from './AddFavFilm'

export class SmallTiles extends React.Component {
  state = {
    addFilmPanelOpen: false,
    showTileButtons: true
  }
  toggleAddPanel = () => {
    this.setState(prevState => ({
      addFilmPanelOpen: !prevState.addFilmPanelOpen
    }))
  }
  toggleShowTileBtns = f => {
    console.log('tooooooooooooge')
    this.setState(prevState => ({
      showTileButtons: !prevState.showTileButtons
    }))
  }
  addFilm = e => {
    this.setState({ addFilmPanelOpen: false })
    this.props.addFilm(e)
  }
  render() {
    const { films, editMode, deleteFilm, openModal } = this.props
    const { addFilmPanelOpen, showTileButtons } = this.state
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
              {showTileButtons && (
                <div className="onhover-tile-btn-container">
                  {editMode && (
                    <button
                      className="onhover-tile-btn"
                      onClick={() => deleteFilm(f._id)}
                    >
                      delete
                    </button>
                  )}
                  <button
                    className="onhover-tile-btn"
                    onClick={() => openModal(f)}
                  >
                    recommend this film
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }
}

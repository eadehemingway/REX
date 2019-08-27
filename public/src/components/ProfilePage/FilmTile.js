import React from 'react'
import './style.css'

export class FilmTile extends React.Component {
  state = {
    showMoreMenu: false
  }
  toggleMoreMenu = () => {
    this.setState(prevState => ({ showMoreMenu: !prevState.showMoreMenu }))
  }
  render() {
    const { film, editMode, deleteFilm, openModal, containerClass } = this.props
    const { showMoreMenu } = this.state
    return (
      <div className={containerClass}>
        <img
          className="large-film-img"
          src={`https://image.tmdb.org/t/p/w185/${film.poster_path}`}
        />

        <div
          className="more-menu-btn interactive"
          onClick={this.toggleMoreMenu}
        >
          ...
        </div>
        {showMoreMenu && (
          <div className="onhover-tile-btn-container">
            {editMode && (
              <button
                className="interactive"
                onClick={() => deleteFilm(film._id)}
              >
                delete
              </button>
            )}
            <button className="interactive" onClick={() => openModal(film)}>
              send rex
            </button>
          </div>
        )}
      </div>
    )
  }
}

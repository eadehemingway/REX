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
        {/* <p>{title}</p> */}
        {/* {tag.length > 0 &&
              tag.map((t, i) => (
                <p key={i} style={{ background: t.colour }}>
                  {t.name}
                </p>
              ))} */}
        <div className="more-menu-btn" onClick={this.toggleMoreMenu}>
          ...
        </div>
        {showMoreMenu && (
          <div className="onhover-tile-btn-container">
            {editMode && (
              <button onClick={() => deleteFilm(film._id)}>delete</button>
            )}
            <button onClick={() => openModal(film)}>recommend this film</button>
          </div>
        )}
      </div>
    )
  }
}

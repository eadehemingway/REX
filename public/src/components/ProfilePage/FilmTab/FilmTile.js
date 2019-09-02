import React from 'react'
import './style.css'

export class FilmTile extends React.Component {
  state = {
    showMoreMenu: false
  }
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOut, false)
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOut, false)
  }
  handleClickOut = e => {
    if (this.moreMenu && this.moreMenu.contains(e.target)) return
    this.setState({ showMoreMenu: false })
  }

  toggleMoreMenu = () => {
    this.setState(prevState => ({ showMoreMenu: !prevState.showMoreMenu }))
  }
  render() {
    const {
      film,
      editMode,
      deleteFilm,
      openSendRexModal,
      containerClass,
      imageClass
    } = this.props
    const { showMoreMenu } = this.state
    return (
      <div className={`${containerClass} film-tile`}>
        <img
          className={`${imageClass} `}
          src={`https://image.tmdb.org/t/p/w185/${film.poster_path}`}
        />

        <div
          className="more-menu-btn interactive"
          onClick={this.toggleMoreMenu}
        >
          ...
        </div>
        {showMoreMenu && (
          <div
            className="film-tile-more-menu"
            ref={moreMenu => (this.moreMenu = moreMenu)}
          >
            {editMode && (
              <button
                className="interactive more-menu-list-item"
                onClick={() => deleteFilm(film._id)}
              >
                Delete
              </button>
            )}
            <button
              className="interactive more-menu-list-item"
              onClick={() => openSendRexModal(film)}
            >
              Send rex
            </button>
          </div>
        )}
      </div>
    )
  }
}

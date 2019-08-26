import React from 'react'
import { FilmDropDown } from './FilmDropDown'

export class AddTopFilmModal extends React.Component {
  state = {
    selectedFilm: null
  }
  handleClick = e => {
    if (this.modalWindow.contains(e.target)) return
    this.props.closeModal()
  }
  selectFilm = filmInfo => {
    this.setState({ selectedFilm: filmInfo })
  }
  render() {
    const { selectedFilm } = this.state

    const { addTopFilm } = this.props

    return (
      <div className="modal-overlay" onClick={this.handleClick}>
        <div
          className="modal-window"
          ref={modalWindow => (this.modalWindow = modalWindow)}
        >
          <FilmDropDown selectFilm={this.selectFilm} />
          {selectedFilm && (
            <div>
              <img
                className="drop-down-image"
                src={`https://image.tmdb.org/t/p/w185/${selectedFilm.poster_path}`}
              />
              <li className="auto-complete-list">{selectedFilm.title}</li>
            </div>
          )}
          <button
            onClick={() =>
              addTopFilm(selectedFilm, { colour: '', name: 'TOP' })
            }
          >
            add film
          </button>
        </div>
      </div>
    )
  }
}

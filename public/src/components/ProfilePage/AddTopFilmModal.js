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

          <button onClick={() => addTopFilm(selectedFilm)}>add film</button>
        </div>
      </div>
    )
  }
}

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
  addTopFilm = () => {
    const { selectedFilm } = this.state
    if (!selectedFilm) return
    const { addTopFilm } = this.props
    addTopFilm(selectedFilm)
  }
  render() {
    const { selectedFilm } = this.state
    return (
      <div className="modal-overlay" onClick={this.handleClick}>
        <div
          className="modal-window"
          ref={modalWindow => (this.modalWindow = modalWindow)}
        >
          <div className="modal-content">
            <FilmDropDown
              selectFilm={this.selectFilm}
              selectedFilm={selectedFilm}
            />
            <button onClick={this.addTopFilm}>add film</button>
          </div>
        </div>
      </div>
    )
  }
}

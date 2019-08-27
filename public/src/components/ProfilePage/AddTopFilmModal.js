import React from 'react'
import { FilmDropDown } from './FilmDropDown'
import { Modal } from './Modal'

export class AddTopFilmModal extends React.Component {
  state = {
    selectedFilm: null
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
    const { closeModal } = this.props
    return (
      <Modal closeModal={closeModal}>
        <FilmDropDown
          selectFilm={this.selectFilm}
          selectedFilm={selectedFilm}
        />
        <button className="modal-btn button" onClick={this.addTopFilm}>
          add film
        </button>
      </Modal>
    )
  }
}

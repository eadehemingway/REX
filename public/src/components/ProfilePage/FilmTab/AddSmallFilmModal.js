import React from 'react'
import { FilmDropDown } from '../FilmDropDown'
import { Modal } from '../Modal'

export class AddSmallFilmModal extends React.Component {
  state = {
    selectedFilm: null
  }

  selectFilm = filmInfo => {
    this.setState({ selectedFilm: filmInfo })
  }

  render() {
    const { selectedFilm } = this.state
    return (
      <Modal closeModal={this.props.closeModal}>
        <FilmDropDown
          selectFilm={this.selectFilm}
          selectedFilm={selectedFilm}
          deleteSelectedFilm={() => this.setState({ selectedFilm: null })}
        />
        <div className="modal-btn-container">
          <button
            className="button modal-btn"
            onClick={() => this.props.addFilm(selectedFilm)}
          >
            submit
          </button>
        </div>
      </Modal>
    )
  }
}

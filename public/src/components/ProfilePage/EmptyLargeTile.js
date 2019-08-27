import React from 'react'
import './style.css'
import { AddTopFilmModal } from './AddTopFilmModal'

export class EmptyLargeTile extends React.Component {
  state = {
    topFilm: null,
    addModalOpen: false
  }

  toggleAddModal = () => {
    this.setState(prevState => ({ addModalOpen: !prevState.addModalOpen }))
  }
  addTopFilm = film => {
    const { addTopFilm } = this.props
    addTopFilm(film, { colour: '', name: 'TOP' })
    this.setState({ addModalOpen: false })
  }
  render() {
    const { addModalOpen } = this.state
    return (
      <div>
        {addModalOpen && (
          <AddTopFilmModal
            closeModal={this.toggleAddModal}
            addTopFilm={this.addTopFilm}
          />
        )}
        <button
          onClick={this.toggleAddModal}
          className="empty-tile-btn interactive"
        >
          +
        </button>
      </div>
    )
  }
}

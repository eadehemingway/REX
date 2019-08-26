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
  render() {
    const { addModalOpen } = this.state
    const { addTopFilm } = this.props
    return (
      <div>
        {addModalOpen && (
          <AddTopFilmModal
            closeModal={this.toggleAddModal}
            addTopFilm={addTopFilm}
          />
        )}
        <button onClick={this.toggleAddModal} className="empty-tile-btn">
          +
        </button>
      </div>
    )
  }
}

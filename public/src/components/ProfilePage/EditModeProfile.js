import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Modal } from './Modal'
import { FavouriteFilms } from './FavouriteFilms'
import axios from 'axios'
import { jdenticon } from 'jdenticon' // need this for the identicon
import { AddFavFilm } from './AddFavFilm'

export class EditModeProfile extends React.Component {
  state = {}

  render() {
    const {
      addFilm,
      openModal,
      closeModal,
      filmToRecommend,
      favFilms,
      deleteFilm,
      modalOpen
    } = this.props
    return (
      <div>
        {' '}
        EDIT MODE
        <div className="link-container">
          <Link to="/recommendations"> RECOMMENDATIONS </Link>
        </div>
        <AddFavFilm addFilm={addFilm} />
        {modalOpen && (
          <Modal
            openModal={openModal}
            closeModal={closeModal}
            film={filmToRecommend}
          />
        )}
        {favFilms.length > 0 && (
          <FavouriteFilms
            films={favFilms}
            deleteFilm={deleteFilm}
            editMode={true}
            openModal={this.openModal}
          />
        )}
      </div>
    )
  }
}

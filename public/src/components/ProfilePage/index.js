import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Modal } from './Modal'
import { FavouriteFilms } from './FavouriteFilms'
import axios from 'axios'
import { jdenticon } from 'jdenticon' // need this for the identicon
import { AddFavFilm } from './AddFavFilm'

class ProfilePage extends React.Component {
  state = {
    modalOpen: false,
    userObj: null,
    favFilms: [],
    editMode: false,
    filmToRecommend: null
  }

  componentDidMount() {
    const { userBeingViewed, signedInUser } = this.props
    const editMode = userBeingViewed === signedInUser
    axios.get(`/api/user/${this.props.userBeingViewed}`).then(res => {
      const favFilms = res.data.doc.films || []

      this.setState({ favFilms, editMode })
    })
  }

  addFilm = (newFilm, tag = {}) => {
    const newFilmWithTag = { ...newFilm, tag: [tag] }
    const newFilmArr = [...this.state.favFilms, newFilmWithTag]
    this.setState({ favFilms: newFilmArr })

    axios
      .patch('/api/film', {
        handle: this.props.signedInUser,
        filmInfo: newFilmWithTag
      })
      .catch(e => console.log('ERROR ADDING FILM', e))
  }
  openModal = (film = null) => {
    this.setState({ filmToRecommend: film, modalOpen: true })
  }
  closeModal = () => {
    this.setState({ modalOpen: false, filmToRecommend: null })
  }
  deleteFilm = filmId => {
    const newFilmArr = [...this.state.favFilms].filter(f => f._id !== filmId)
    this.setState({ favFilms: newFilmArr })
    axios
      .delete(`/api/film/${filmId}`)
      .catch(e => console.log('ERROR DELETING FILM', e))
  }
  render() {
    const { modalOpen, favFilms, editMode, filmToRecommend } = this.state
    const { userBeingViewed } = this.props
    return (
      <div className="page-content">
        <svg
          width="80"
          height="80"
          data-jdenticon-value={userBeingViewed}
        ></svg>
        {editMode && (
          <div className="link-container">
            <Link to="/recommendations"> RECOMMENDATIONS </Link>
          </div>
        )}
        <h1> {userBeingViewed}</h1>
        {editMode && (
          <button type="button" onClick={() => this.openModal()}>
            SEND REX
          </button>
        )}
        {modalOpen && (
          <Modal
            openModal={this.openModal}
            closeModal={this.closeModal}
            film={filmToRecommend}
          />
        )}
        {favFilms.length > 0 && (
          <FavouriteFilms
            films={favFilms}
            deleteFilm={this.deleteFilm}
            editMode={editMode}
            openModal={this.openModal}
          />
        )}
        {editMode && <AddFavFilm addFilm={this.addFilm} />}
      </div>
    )
  }
}

export const ProfilePageConnected = connect(state => {
  return {
    userBeingViewed: state.userBeingViewed,
    signedInUser: state.signedInUser
  }
})(ProfilePage)

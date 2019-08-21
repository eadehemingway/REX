import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Modal } from './Modal'
import { FavouriteFilms } from './FavouriteFilms'
import axios from 'axios'
import { FilmDropDown } from './FilmDropDown'

class ProfilePage extends React.Component {
  state = {
    modalOpen: false,
    userObj: null,
    favFilms: [],
    viewMode: true
  }

  componentDidMount() {
    const { userBeingViewed, signedInUser } = this.props
    const viewMode = userBeingViewed !== signedInUser
    axios.get(`/api/user/${this.props.userBeingViewed}`).then(res => {
      const favFilms = res.data.doc || []
      this.setState({ favFilms, viewMode })
    })
  }

  addFilm = newFilm => {
    const newFilmArr = [...this.state.favFilms, newFilm]
    this.setState({ favFilms: newFilmArr })
    axios.patch('/api/film', {
      handle: this.props.signedInUser,
      filmInfo: newFilm
    })
  }
  toggleModal = () => {
    const { modalOpen } = this.state
    this.setState({ modalOpen: !modalOpen })
  }
  deleteFilm = filmId => {
    const newFilmArr = [...this.state.favFilms].filter(f => f._id !== filmId)
    this.setState({ favFilms: newFilmArr })
    axios.delete(`/api/film/${filmId}`).then(res => {})
  }
  render() {
    const { modalOpen, favFilms, viewMode } = this.state
    return (
      <div className="page-content">
        {!viewMode && (
          <div className="link-container">
            <Link to="/recommendations"> RECOMMENDATIONS </Link>
          </div>
        )}
        <h1> {this.props.userBeingViewed}</h1>
        {!viewMode && (
          <button type="button" onClick={this.toggleModal}>
            SEND REX
          </button>
        )}
        {modalOpen && <Modal toggleModal={this.toggleModal} />}
        {favFilms.length > 0 && (
          <FavouriteFilms
            films={favFilms}
            deleteFilm={this.deleteFilm}
            viewMode={viewMode}
          />
        )}
        {!viewMode && <FilmDropDown selectFilm={this.addFilm} />}
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

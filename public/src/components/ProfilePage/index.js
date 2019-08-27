import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { jdenticon } from 'jdenticon' // need this for the identicon
import { EditModeProfileConnected } from './EditModeProfile'
import { FilmTabConnected } from './FilmTab'

class ProfilePage extends React.Component {
  state = {
    modalOpen: false,
    userObj: null,
    favFilms: [],
    editMode: false,
    filmToRecommend: null,
    tabOpen: 'films'
  }

  componentDidMount() {
    const { userBeingViewed, signedInUser } = this.props

    const editMode = userBeingViewed === signedInUser
    axios.get(`/api/user/${this.props.userBeingViewed}`).then(res => {
      const favFilms = res.data.doc.films || []

      this.setState({ favFilms, editMode })
    })
  }

  openModal = (film = null) => {
    this.setState({ filmToRecommend: film, modalOpen: true })
  }
  closeModal = () => {
    this.setState({ modalOpen: false, filmToRecommend: null })
  }

  render() {
    const { modalOpen, favFilms, editMode, filmToRecommend } = this.state

    const { userBeingViewed } = this.props

    return (
      <div className="page-content">
        <div className="profile-header">
          <svg
            width="80"
            height="80"
            data-jdenticon-value={userBeingViewed}
            className="profile-pic"
          ></svg>
          <div className="handle-send-rex-btn-container">
            <p className="handle-title"> @{userBeingViewed}</p>

            {editMode && (
              <button
                className="send-rex-btn button"
                type="button"
                onClick={() => this.openModal()}
              >
                SEND REX
              </button>
            )}
          </div>
        </div>

        {editMode && (
          <EditModeProfileConnected
            openModal={this.openModal}
            closeModal={this.closeModal}
            filmToRecommend={filmToRecommend}
            favFilms={favFilms}
            modalOpen={modalOpen}
          />
        )}
        {!editMode && (
          <FilmTabConnected
            films={favFilms}
            editMode={editMode}
            openModal={this.openModal}
          />
        )}
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

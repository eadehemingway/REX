import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Modal } from './Modal'
import { FavouriteFilms } from './FavouriteFilms'

class ProfilePage extends React.Component {
  state = {
    modalOpen: false
  }

  toggleModal = () => {
    const { modalOpen } = this.state
    this.setState({ modalOpen: !modalOpen })
  }

  render() {
    const { modalOpen } = this.state

    return (
      <div className="page-content">
        <h1> user page for {this.props.userInfo.userName}</h1>
        <div className="link-container">
          <Link to="/recommendations"> RECOMMENDATIONS </Link>
        </div>

        <button type="button" onClick={this.toggleModal}>
          SEND REX
        </button>
        {modalOpen && <Modal toggleModal={this.toggleModal} />}
        <FavouriteFilms />
      </div>
    )
  }
}

export const ProfilePageConnected = connect(state => ({
  userInfo: state.currentPageUserInfo
}))(ProfilePage)

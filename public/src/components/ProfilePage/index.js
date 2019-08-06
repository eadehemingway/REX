import React from 'react'
import { Link } from 'react-router-dom'

import Axios from 'axios'
import { Modal } from './Modal'
import { FavouriteFilms } from './FavouriteFilms'

export class ProfilePage extends React.Component {
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
        <h1> user page</h1>
      
        <div className="link-container">
          <Link to="/signup"> SIGN UP</Link>
          <Link to="/signin"> SIGN IN </Link>
          <Link to="/recommendations"> RECOMMENDATIONS </Link>
        </div>

        <button type="button" onClick={this.toggleModal}>
          {' '}
          SEND REX{' '}
        </button>
        {modalOpen && <Modal toggleModal={this.toggleModal} />}
        <FavouriteFilms />
      </div>
    )
  }
}

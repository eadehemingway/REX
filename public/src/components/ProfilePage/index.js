import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Modal } from './Modal'
import { FavouriteFilms } from './FavouriteFilms'
import { increment } from '../../actions/actions'

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
    const { incrementByFive, eade } = this.props

    return (
      <div className="page-content">
        <h1> user page</h1>
        <button type="button" onClick={incrementByFive}>
          {' '}
          nummmmmmmmmmmmmmmmmmmmmmmmmmmm{eade}
        </button>
        <div className="link-container">
          <Link to="/signup"> SIGN UP</Link>
          <Link to="/signin"> SIGN IN </Link>
          <Link to="/recommendations"> RECOMMENDATIONS </Link>
          <Link to="/user/:id"> EXTERNAL PROF </Link>
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

export const ProfilePageConnected = connect(
  state => ({ eade: state.counter }),
  dispatch => ({
    incrementByFive: () => dispatch(increment(5))
  })
)(ProfilePage)

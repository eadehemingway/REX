import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux'
import { signOutSuccess, updateUserPage } from '../../actions/actions'

class Nav extends Component {
  state = {
    userToSearch: ''
  }

  searchUser = () => {
    const { userToSearch } = this.state
    this.props.updateUserPage(userToSearch)

    this.props.history.push(`/user/${userToSearch}`)
  }

  signOut = () => {
    // changes redux store
    this.props.signOut()
    // deletes the jwt
    axios
      .get('/api/user/signout')
      .then(res => console.log(res))
      .catch(e => console.log(e))
  }

  render() {
    return (
      <nav className="nav-bar">
        <Link to="/" className="home-btn">
          HOME{' '}
        </Link>
        <div className="search-bar">
          <input
            type="text"
            onChange={e => this.setState({ userToSearch: e.target.value })}
          />
          <button onClick={this.searchUser}> search</button>
          <button onClick={() => this.signOut()}>LOG OUT</button>
        </div>
      </nav>
    )
  }
}

const NavConnected = connect(
  null,
  dispatch => ({
    signOut: () => dispatch(signOutSuccess()),
    updateUserPage: userInfo => dispatch(updateUserPage(userInfo))
  })
)(Nav)

export default withRouter(NavConnected) // the withRouter allows the nav to cause a redirect using history.push

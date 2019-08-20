import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux'
import {
  SignOutSuccess,
  UpdateCurrentPageUserInfo
} from '../../actions/actions'

class Nav extends Component {
  state = {
    userToSearch: ''
  }

  searchUser = () => {
    const { userToSearch } = this.state
    axios
      .get(`/api/user/${userToSearch}`)
      .then(res => {
        const userObj = {
          userName: userToSearch,
          data: res.data.doc
        }
        this.props.UpdateCurrentPageUserInfo(userObj)
      })
      .then(() => {
        this.props.history.push(`/user/${userToSearch}`)
      })
      .catch(e => console.log(e))
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
    signOut: () => dispatch(SignOutSuccess()),
    UpdateCurrentPageUserInfo: userInfo =>
      dispatch(UpdateCurrentPageUserInfo(userInfo))
  })
)(Nav)

export default withRouter(NavConnected) // the withRouter allows the nav to cause a redirect using history.push

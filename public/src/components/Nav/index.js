import React, { Component } from 'react'
import { Link , withRouter } from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux'
import { signOutSuccess, UpdateCurrentPageUserInfo } from "../../actions/actions"


class Nav extends Component {
  state = {
    value: ''
  }

  componentDidMount() {
    axios.get('/api/user').then(({ data }) => {})
  }

  search = e => {
    const { value } = this.state

    axios
      .get(`/api/user/${value}`)
      .then(res => {
        console.log(value)
        // update redux store with this data...?
        this.props.UpdateCurrentPageUserInfo(res.data.doc)
        console.log(res.data.doc)
      })
      .then(() => {
        this.props.history.push(`/user/${value}`)
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
          {' '}
          HOME{' '}
        </Link>
        <div className="search-bar">
          <input
            type="text"
            onChange={e => this.setState({ value: e.target.value })}
          />
          <button onClick={this.search}> search</button>

          <button onClick={() => this.signOut()}>LOG OUT</button>
        </div>
      </nav>
    )
  }
}

const NavConnected = connect(
  null,
  dispatch => ({
    signOut: () => dispatch(new signOutSuccess()),
    UpdateCurrentPageUserInfo: (userInfo)=> dispatch(new UpdateCurrentPageUserInfo(userInfo))
  })
)(Nav)

export default withRouter(NavConnected)

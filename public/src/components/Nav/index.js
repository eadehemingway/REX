import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux'
import { signOutSuccess } from './../../actions/actions'

class Nav extends Component {
  state = {
    value: ''
  }

  componentDidMount() {
    axios.get('/api/user').then(({ data }) => {})
  }

  search = e => {
    const { value } = this.state

    axios.get(`/api/search/${value}`).then(({ data }) => {})
  }

  signOut = () => {
    console.log('HERE')
    // changes redux store
  // this.props.signOut()  
  // deletes the jwt
  axios.get('/api/user/signout').then((res) => console.log(res)).catch(e=> console.log(e))
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

export const NavConnected =  connect(
  null,
  dispatch => ({
    signOut: () => dispatch(new signOutSuccess)
  })
)(Nav)

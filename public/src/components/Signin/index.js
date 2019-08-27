import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux'
import {
  signInSuccess,
  updateSignedInUser,
  updateUserBeingViewed
} from '../../actions/actions'

class Signin extends React.Component {
  state = {
    handle: '',
    password: ''
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value })
  }

  handleClick = () => {
    const { handle, password } = this.state
    const {
      history,
      signInSuccess,
      updateSignedInUser,
      updateUserBeingViewed
    } = this.props
    axios
      .post('/api/user/signin', { handle, password })
      .then(({ data }) => {
        if (data.status === 'success') {
          const { handle } = data.user
          signInSuccess()
          updateUserBeingViewed(handle)
          updateSignedInUser(handle)
          history.push('/')
        } else {
          this.setState({ error })
        }
      })
      .catch(error => {
        this.setState({ error })
      })
  }

  render() {
    return (
      <div>
        <input
          type="text"
          name="handle"
          value={this.state.handle}
          placeholder="handle"
          onChange={this.handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={this.state.password}
          onChange={this.handleChange}
        />
        <button className="button" onClick={this.handleClick}>
          sign in
        </button>
        <p>
          dont have an account?
          <Link to="/signup"> SIGN UP</Link> instead
        </p>
      </div>
    )
  }
}

export const SigninConnected = connect(
  state => ({ signedIn: state.signedIn }),
  dispatch => ({
    signInSuccess: () => dispatch(signInSuccess()),
    updateSignedInUser: handle => dispatch(updateSignedInUser(handle)),
    updateUserBeingViewed: handle => dispatch(updateUserBeingViewed(handle))
  })
)(Signin)

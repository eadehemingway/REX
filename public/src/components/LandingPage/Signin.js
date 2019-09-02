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

  handleClick = e => {
    e.preventDefault()
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
          history.push(`/user/${handle}`)
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
      <div className="signup-signin-form">
        <form onSubmit={this.handleClick}>
          <h2>Sign in</h2>
          <input
            className="form-input"
            type="text"
            name="handle"
            value={this.state.handle}
            placeholder="handle"
            onChange={this.handleChange}
          />
          <input
            className="form-input"
            type="password"
            name="password"
            placeholder="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <button type="submit" className="button">
            sign in
          </button>
        </form>
        <p>
          dont have an account?
          <button onClick={this.props.switchTab}> SIGN UP</button> instead
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

import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export class Signup extends React.Component {
  state = {
    handle: '',
    password: '',
    email: ''
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value })
  }

  handleClick = e => {
    e.preventDefault()
    const { handle, email, password } = this.state
    const { history } = this.props
    axios
      .post('/api/user/signup', { handle, email, password })
      .then(({ data }) => {
        if (data) {
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
      <div className="signup-signin-form">
        <h2>Sign Up</h2>
        <form onSubmit={this.handleClick}>
          <input
            type="text"
            name="handle"
            value={this.state.handle}
            placeholder="handle"
            onChange={this.handleChange}
            className="form-input"
          />
          <input
            type="text"
            name="email"
            value={this.state.email}
            placeholder="username"
            onChange={this.handleChange}
            className="form-input"
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            value={this.state.password}
            onChange={this.handleChange}
            className="form-input"
          />
          <button type="submit" className="button">
            signUp
          </button>
        </form>

        <p>
          dont have an account?
          <button onClick={this.props.switchTab}> SIGN IN</button> instead
        </p>
      </div>
    )
  }
}

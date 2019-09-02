import React from 'react'
import axios from 'axios'

export class Signup extends React.Component {
  state = {
    handle: '',
    password: '',
    email: '',
    userExists: false
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value })
  }

  handleHandleChange = e => {
    const { value } = e.target
    this.setState({ handle: value })
    axios.get(`/api/user/${value}`).then(res => {
      if (res.data.userExists) {
        this.setState({ userExists: true })
      } else {
        this.setState({ userExists: false })
      }
    })
  }
  handleClick = e => {
    e.preventDefault()
    const { handle, email, password } = this.state
    const { updateReduxSignedIn } = this.props
    axios
      .post('/api/user/signup', { handle, email, password })
      .then(({ data }) => {
        if (data.status === 'success') {
          updateReduxSignedIn(handle)
        } else {
          this.setState({ error })
        }
      })
      .catch(error => {
        this.setState({ error })
      })
  }

  render() {
    const { userExists } = this.state
    return (
      <div className="signup-signin-form">
        <h2>Sign Up</h2>
        <form onSubmit={this.handleClick}>
          <input
            type="text"
            name="handle"
            value={this.state.handle}
            placeholder="handle"
            onChange={this.handleHandleChange}
            className="form-input"
            style={{
              border: `${userExists ? '2px solid red' : '1px solid gray'}`
            }}
          />
          {userExists && (
            <p className="warning-text"> This username is taken </p>
          )}
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
          <button type="submit" className="button" disabled={userExists}>
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

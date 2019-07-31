import React, { Component } from 'react'
import axios from 'axios'

export class Signup extends Component {
  state = {
    handle: '',
    password: '',
    email: ''
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value })
  }

  handleClick = () => {
    const { handle, email, password } = this.state
    const { history } = this.props
    axios
      .post('/api/user/signup', { handle, email, password })
      .then(({ data }) => {
        if (data) {
          console.log('signup success')

          history.push('/signin')
        } else {
          console.log('signup fail')

          this.setState({ error })
        }
      })
      .catch(error => {
        console.log('signup fail')

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
          type="text"
          name="email"
          value={this.state.email}
          placeholder="username"
          onChange={this.handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={this.state.password}
          onChange={this.handleChange}
        />
        <button onClick={this.handleClick}>signUp</button>{' '}
      </div>
    )
  }
}

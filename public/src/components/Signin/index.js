import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export class Signin extends React.Component {
  state = {
    handle: '',
    password: ''
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value })
  }

  handleClick = () => {
    const { handle, password } = this.state
    // const { history } = this.props
    axios
      .post('/api/user/signin', { handle, password })
      .then(({ data }) => {
        if (data) {
          console.log('dataaaa', data)
          // history.push('/signin')
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
        <button onClick={this.handleClick}>signUp</button>
        <p>
          {' '}
          dont have an account?
          <Link to="/signup"> SIGN UP</Link> instead
        </p>
      </div>
    )
  }
}

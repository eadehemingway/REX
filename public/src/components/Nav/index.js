import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export class Nav extends Component {
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
        </div>
      </nav>
    )
  }
}

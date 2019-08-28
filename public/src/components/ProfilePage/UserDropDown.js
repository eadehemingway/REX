import React from 'react'
import axios from 'axios'
import './style.css'
import SearchIcon from '../../assets/search.png'

export class UserDropDown extends React.Component {
  state = {
    userToSearch: '',
    userInfo: [],
    showDropDown: false
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOut, false)
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOut, false)
  }

  handleClickOut = e => {
    if (this.userDropdown && this.userDropdown.contains(e.target)) {
      return
    }
    this.setState({ showDropDown: false })
  }
  getUsers = user => {
    if (user === '') {
      this.setState({ userToSearch: user, showDropDown: false })
      return
    }
    this.setState({ userToSearch: user, showDropDown: true })
    axios.get(`/api/user/all/${user}`).then(res => {
      if (!res.data.data.filteredUsers) return
      this.setState({ userInfo: res.data.data.filteredUsers })
    })
  }

  selectUser = user => {
    this.setState({ showDropDown: false })
    this.props.selectUser(user)
  }
  keyPressed = (event, user) => {
    const keyCode = event.keyCode || event.which
    if (keyCode === 13) {
      this.props.selectUser(user)
    }
  }
  render() {
    const { userInfo, userToSearch, showDropDown } = this.state
    return (
      <div className="search-bar">
        <input
          id="user"
          type="text"
          value={userToSearch}
          className="text-input search-input"
          onChange={e => this.getUsers(e.target.value)}
          onKeyPress={e => this.keyPressed(e, userToSearch)}
        />
        <img
          src={SearchIcon}
          className="search-icon"
          onClick={() => this.selectUser(userToSearch)}
        />
        <div
          className="user-drop-down-container"
          ref={userDropdown => (this.userDropdown = userDropdown)}
        >
          {showDropDown &&
            userInfo.map(u => (
              <button
                className="dropdown-list-item interactive"
                key={u.handle}
                onClick={() => this.selectUser(u.handle)}
              >
                <p>{u.handle}</p>
              </button>
            ))}
        </div>
      </div>
    )
  }
}

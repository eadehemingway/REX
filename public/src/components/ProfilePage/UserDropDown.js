import React from 'react'
import axios from 'axios'
import './style.css'
import SearchIcon from '../../assets/search.png'

export class UserDropDown extends React.Component {
  state = {
    userInfoList: [],
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
      this.setState({ showDropDown: false })
      return
    }
    this.setState({ showDropDown: true })
    this.props.updateUser(user)
    axios.get(`/api/user/all/${user}`).then(res => {
      if (!res.data.data.filteredUsers) return
      this.setState({ userInfoList: res.data.data.filteredUsers })
    })
  }

  selectUser = user => {
    this.setState({ showDropDown: false })
    this.props.updateUser(user)
    this.props.selectUser(user)
  }
  keyPressed = (event, user) => {
    const keyCode = event.keyCode || event.which
    if (keyCode === 13) {
      this.props.selectUser(user)
    }
  }
  render() {
    const { userInfoList, showDropDown } = this.state
    const { selectedUser, containerClass, inputClass } = this.props

    return (
      <div className={`search-bar-container ${containerClass}`}>
        <input
          id="user"
          type="text"
          value={selectedUser}
          className={inputClass}
          onChange={e => this.getUsers(e.target.value)}
          onKeyPress={e => this.keyPressed(e, selectedUser)}
        />
        <img
          src={SearchIcon}
          className="search-icon"
          onClick={() => this.selectUser(selectedUser)}
        />
        <div
          className="user-drop-down-container"
          ref={userDropdown => (this.userDropdown = userDropdown)}
        >
          {showDropDown &&
            userInfoList.map(u => (
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

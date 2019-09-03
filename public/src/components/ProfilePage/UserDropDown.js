import React from 'react'
import axios from 'axios'
import './style.css'
import SearchIcon from '../../assets/search.svg'

export class UserDropDown extends React.Component {
  state = {
    userInfoList: [],
    showDropDown: false,
    userSeletedFromDropdown: false
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
      this.props.updateUser(user)
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
    this.setState({ showDropDown: false, userSeletedFromDropdown: true })
    this.props.updateUser(user)
    this.props.selectUser(user)
  }
  keyPressed = (event, user) => {
    const { userSeletedFromDropdown } = this.state
    const keyCode = event.keyCode || event.which
    if (keyCode === 13) {
      this.props.selectUser(user)
    }
    if (keyCode === 8 && userSeletedFromDropdown) {
      this.props.updateUser('')
      this.setState({ userSeletedFromDropdown: false })
    }
  }
  render() {
    const { userInfoList, showDropDown, userSeletedFromDropdown } = this.state
    const { selectedUser, containerClass, inputClass, placeholder } = this.props

    return (
      <div className={`search-bar-container ${containerClass}`}>
        <input
          id="user"
          type="text"
          value={`${userSeletedFromDropdown ? '@' : ''}${selectedUser}`}
          className={inputClass}
          style={{ color: userSeletedFromDropdown ? 'blue' : 'black' }}
          onChange={e => this.getUsers(e.target.value)}
          onKeyDown={e => this.keyPressed(e, selectedUser)}
          placeholder={placeholder}
        />
        <img
          src={SearchIcon}
          className="dropdown-search-icon"
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
                <p style={{ color: 'blue' }}>@{u.handle}</p>
              </button>
            ))}
        </div>
      </div>
    )
  }
}

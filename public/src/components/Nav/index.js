import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux'
import { signOutSuccess, updateUserBeingViewed } from '../../actions/actions'
import { SettingsMenu } from './SettingsMenu'
import Menu from '../../assets/menu.svg'
import { UserDropDown } from '../ProfilePage/UserDropDown'

class Nav extends Component {
  state = {
    userToSearch: '',
    showSettingsMenu: false
  }
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOut, false)
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOut, false)
  }

  handleClickOut = e => {
    if (this.settingsMenu && this.settingsMenu.contains(e.target)) {
      return
    }
    this.setState({ showSettingsMenu: false })
  }
  goToProfilePage = userHandle => {
    const { updateUserBeingViewed } = this.props
    updateUserBeingViewed(userHandle)
    this.props.history.push(`/user/${userHandle}`)
  }

  signOut = () => {
    // changes redux store
    this.props.signOut()
    // deletes the jwt
    axios.get('/api/user/signout').catch(e => console.log(e))
    this.setState({ showSettingsMenu: false })
  }

  toggleShowSettingsMenu = () => {
    this.setState({ showSettingsMenu: !this.state.showSettingsMenu })
  }
  updateUserToSearch = user => {
    this.setState({ userToSearch: user })
  }

  render() {
    const { signedInUser } = this.props
    const { userToSearch } = this.state
    return (
      <nav className="nav-bar">
        <UserDropDown
          selectUser={this.goToProfilePage}
          selectedUser={userToSearch}
          updateUser={this.updateUserToSearch}
          containerClass="nav-search-input-container"
          inputClass="nav-input"
          placeholder=""
        />
        <button
          className="settings-btn interactive"
          onClick={() => this.toggleShowSettingsMenu()}
        >
          <img src={Menu} className="hamburger-menu" />
        </button>
        <div ref={settingsMenu => (this.settingsMenu = settingsMenu)}>
          {this.state.showSettingsMenu && (
            <SettingsMenu
              signout={this.signOut}
              goToMyProfile={() => this.goToProfilePage(signedInUser)}
            />
          )}
        </div>
      </nav>
    )
  }
}

const NavConnected = connect(
  state => ({ signedInUser: state.signedInUser }),
  dispatch => ({
    signOut: () => dispatch(signOutSuccess()),
    updateUserBeingViewed: userInfo => dispatch(updateUserBeingViewed(userInfo))
  })
)(Nav)

export default withRouter(NavConnected) // the withRouter allows the nav to cause a redirect using history.push

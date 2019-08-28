import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux'
import { signOutSuccess, updateUserBeingViewed } from '../../actions/actions'
import { SettingsMenu } from './SettingsMenu'
import Logo from '../../assets/rex.png'
import SearchIcon from '../../assets/search.png'
import SettingsIcon from '../../assets/settings.png'

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
    axios
      .get('/api/user/signout')
      .then(res => console.log(res))
      .catch(e => console.log(e))
    this.setState({ showSettingsMenu: false })
  }
  keyPressed = (event, user) => {
    const keyCode = event.keyCode || event.which
    if (keyCode === 13) {
      this.goToProfilePage(user)
    }
  }
  toggleShowSettingsMenu = () => {
    this.setState({ showSettingsMenu: !this.state.showSettingsMenu })
  }

  render() {
    const { signedInUser } = this.props
    const { userToSearch } = this.state
    return (
      <nav className="nav-bar">
        <button
          onClick={() => this.goToProfilePage(signedInUser)}
          className="logo-btn interactive"
        >
          <img src={Logo} className="logo" />
        </button>
        <div className="search-bar">
          <input
            className="text-input search-input"
            type="text"
            onChange={e => this.setState({ userToSearch: e.target.value })}
            onKeyPress={e => this.keyPressed(e, userToSearch)}
          />
          <img
            src={SearchIcon}
            className="search-icon"
            onClick={() => this.goToProfilePage(userToSearch)}
          />
        </div>
        <button
          className="settings-btn interactive"
          onClick={() => this.toggleShowSettingsMenu()}
        >
          <img className="settings-icon" src={SettingsIcon} />
        </button>
        <div ref={settingsMenu => (this.settingsMenu = settingsMenu)}>
          {this.state.showSettingsMenu && (
            <SettingsMenu signout={this.signOut} />
          )}
        </div>
      </nav>
    )
  }
}
// onClick={() => this.signOut()}

const NavConnected = connect(
  state => ({ signedInUser: state.signedInUser }),
  dispatch => ({
    signOut: () => dispatch(signOutSuccess()),
    updateUserBeingViewed: userInfo => dispatch(updateUserBeingViewed(userInfo))
  })
)(Nav)

export default withRouter(NavConnected) // the withRouter allows the nav to cause a redirect using history.push

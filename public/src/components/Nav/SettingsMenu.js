import React from 'react'
import './style.css'

export class SettingsMenu extends React.Component {
  render() {
    return (
      <div className="settings-menu">
        <button className="menu-list-item" onClick={this.props.signout}>
          Sign Out
        </button>
        <button className="menu-list-item" onClick={this.props.goToMyProfile}>
          Go to my profile
        </button>
      </div>
    )
  }
}

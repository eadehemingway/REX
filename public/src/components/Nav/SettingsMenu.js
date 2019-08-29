import React from 'react'
import './style.css'

export class SettingsMenu extends React.Component {
  render() {
    return (
      <div className="settings-menu">
        <button className="signout-btn" onClick={this.props.signout}>
          Sign Out
        </button>
      </div>
    )
  }
}

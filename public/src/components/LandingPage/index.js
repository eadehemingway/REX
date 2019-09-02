import React from 'react'
import Logo from '../../assets/rex.svg'
import { SigninConnected } from './Signin'
import { Signup } from './Signup'

export class LandingPage extends React.Component {
  state = {
    onSignInTab: true
  }

  switchTab = () => {
    this.setState(prevState => ({ onSignInTab: !prevState.onSignInTab }))
  }
  render() {
    const { onSignInTab } = this.state
    return (
      <div className="page-content">
        <img src={Logo} />

        {onSignInTab ? (
          <SigninConnected
            switchTab={this.switchTab}
            history={this.props.history}
          />
        ) : (
          <Signup switchTab={this.switchTab} history={this.props.history} />
        )}
      </div>
    )
  }
}

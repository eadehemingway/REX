import React from 'react'
import Logo from '../../assets/rex.svg'
import { Signin } from './Signin'
import { Signup } from './Signup'
import './style.css'
import { connect } from 'react-redux'
import {
  signInSuccess,
  updateSignedInUser,
  updateUserBeingViewed
} from '../../actions/actions'

class LandingPage extends React.Component {
  state = {
    onSignInTab: true
  }

  switchTab = () => {
    this.setState(prevState => ({ onSignInTab: !prevState.onSignInTab }))
  }
  updateReduxSignedIn = handle => {
    const {
      history,
      signInSuccess,
      updateSignedInUser,
      updateUserBeingViewed
    } = this.props
    signInSuccess()
    updateUserBeingViewed(handle)
    updateSignedInUser(handle)
    history.push(`/user/${handle}`)
  }
  render() {
    const { onSignInTab } = this.state

    return (
      <div className="page-content">
        <img src={Logo} className="rex-logo-landing-page" />

        {onSignInTab ? (
          <Signin
            switchTab={this.switchTab}
            updateReduxSignedIn={this.updateReduxSignedIn}
          />
        ) : (
          <Signup
            switchTab={this.switchTab}
            updateReduxSignedIn={this.updateReduxSignedIn}
          />
        )}
      </div>
    )
  }
}

export const LandingPageConnected = connect(
  state => ({ signedIn: state.signedIn }),
  dispatch => ({
    signInSuccess: () => dispatch(signInSuccess()),
    updateSignedInUser: handle => dispatch(updateSignedInUser(handle)),
    updateUserBeingViewed: handle => dispatch(updateUserBeingViewed(handle))
  })
)(LandingPage)

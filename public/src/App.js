import React from 'react'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'

import { Signup } from './components/LandingPage/Signup'
import { SigninConnected } from './components/LandingPage'
import { ProtectedRoute } from './authRoute'
import { ProfilePageConnected } from './components/ProfilePage'
import { LandingPage } from './components/LandingPage'

export class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <ProtectedRoute path="/user/:id" component={ProfilePageConnected} />
        </Switch>
      </BrowserRouter>
    )
  }
}

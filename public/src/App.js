import React from 'react'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import NavWithRouter from './components/Nav'
import { Signup } from './components/Signup'
import { SigninConnected } from './components/Signin'
import { ProtectedRoute } from './authRoute'
import { ProfilePageConnected } from './components/ProfilePage'

import { LandingPage } from './components/LandingPage'

export class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <NavWithRouter />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/signin" component={SigninConnected} />
          <ProtectedRoute path="/user/:id" component={ProfilePageConnected} />
        </Switch>
      </BrowserRouter>
    )
  }
}

import React from 'react'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import { Nav } from './components/Nav'
import { Signup } from './components/Signup'
import { SigninConnected } from './components/Signin'
import { Recommendations } from './components/Recommendations'
import { ProtectedRoute } from './authRoute'
import { ProfilePageConnected } from './components/ProfilePage'

import { HomePage } from './components/HomePage'

export class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Nav />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/signin" component={SigninConnected} />
          <ProtectedRoute path="/user/:id" component={ProfilePageConnected} />
          <ProtectedRoute
            exact
            path="/recommendations"
            component={Recommendations}
          />
        </Switch>
      </BrowserRouter>
    )
  }
}

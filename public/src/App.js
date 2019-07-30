import React from 'react'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import { Nav } from './components/Nav'
import { Signup } from './components/Signup'
import { SigninConnected } from './components/Signin'
import { Recommendations } from './components/Recommendations'
import { ProfilePageConnected } from './components/ProfilePage'
import { ExternalProfile } from './components/ExternalProfile'
import { PublicRoute, ProtectedRoute } from './authRoute'

export class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Nav />
        <Switch>
          <ProtectedRoute exact path="/" component={ProfilePageConnected} />
          <ProtectedRoute path="/user/:id" component={ExternalProfile} />
          <PublicRoute exact path="/signup" component={Signup} />
          <PublicRoute exact path="/signin" component={SigninConnected} />
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

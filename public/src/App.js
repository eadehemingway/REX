import React from 'react'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'

import { Signup } from './components/Signup'
import { SigninConnected } from './components/Signin'
import { ProtectedRoute } from './authRoute'
import { ProfilePageConnected } from './components/ProfilePage'
import './App.css'
import { LandingPage } from './components/LandingPage'

export class App extends React.Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/signin" component={SigninConnected} />
            <ProtectedRoute path="/user/:id" component={ProfilePageConnected} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

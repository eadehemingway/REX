import React from 'react'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import NavWithRouter from './components/Nav'
import { Signup } from './components/Signup'
import { SigninConnected } from './components/Signin'
import { RecommendationsConnected } from './components/Recommendations'
import { ProtectedRoute } from './authRoute'
import { ProfilePageConnected } from './components/ProfilePage'
import './App.css'

import { LandingPage } from './components/LandingPage'

export class App extends React.Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <NavWithRouter />
          <div className="background-rect"></div>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/signin" component={SigninConnected} />
            <ProtectedRoute path="/user/:id" component={ProfilePageConnected} />
            <ProtectedRoute
              exact
              path="/recommendations"
              component={RecommendationsConnected}
            />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { ProtectedRoute } from './authRoute'
import { ProfilePageConnected } from './components/ProfilePage'
import { LandingPageConnected } from './components/LandingPage'

export class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LandingPageConnected} />
          <ProtectedRoute path="/user/:id" component={ProfilePageConnected} />
        </Switch>
      </BrowserRouter>
    )
  }
}

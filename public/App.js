import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Header } from './components/Header';
import { Signup } from './components/Signup';
import { Signin } from './components/Signin';
import { Recommendations } from './components/Recommendations';
import { ProfilePage } from './components/ProfilePage';

export class App extends React.Component {
  render() {
    return (
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={ProfilePage} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/recommendations" component={Recommendations} />
        </Switch>
      </Router>
    );
  }
}

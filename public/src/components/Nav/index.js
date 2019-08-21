import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { signOutSuccess, updateUserBeingViewed } from '../../actions/actions';

class Nav extends Component {
  state = {
    userToSearch: ''
  };

  goToProfilePage = userHandle => {
    const { updateUserBeingViewed } = this.props;
    updateUserBeingViewed(userHandle);
    this.props.history.push(`/user/${userHandle}`);
  };

  signOut = () => {
    // changes redux store
    this.props.signOut();
    // deletes the jwt
    axios
      .get('/api/user/signout')
      .then(res => console.log(res))
      .catch(e => console.log(e));
  };

  render() {
    const { signedInUser } = this.props;
    const { userToSearch } = this.state;
    return (
      <nav className="nav-bar">
        <button
          onClick={() => this.goToProfilePage(signedInUser)}
          className="home-btn"
        >
          MY PROFILE{' '}
        </button>
        <div className="search-bar">
          <input
            type="text"
            onChange={e => this.setState({ userToSearch: e.target.value })}
          />
          <button onClick={() => this.goToProfilePage(userToSearch)}>
            {' '}
            search
          </button>
          <button onClick={() => this.signOut()}>LOG OUT</button>
        </div>
      </nav>
    );
  }
}

const NavConnected = connect(
  state => ({ signedInUser: state.signedInUser }),
  dispatch => ({
    signOut: () => dispatch(signOutSuccess()),
    updateUserBeingViewed: userInfo => dispatch(updateUserBeingViewed(userInfo))
  })
)(Nav);

export default withRouter(NavConnected); // the withRouter allows the nav to cause a redirect using history.push

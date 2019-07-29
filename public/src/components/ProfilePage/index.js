import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from './Modal';
import { FavouriteFilms } from './FavouriteFilms';
import {increment} from './../../actions/actions'
import {connect} from 'react-redux'


class ProfilePage extends React.Component {
  state = {
    modalOpen: false
  };

  toggleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  };
  render() {
    const { modalOpen } = this.state;

    return (
      <div className="page-content">
        <h1> user page</h1>
      <button onClick={this.props.incrementByFive}> nummmmmmmmmmmmmmmmmmmmmmmmmmmm{this.props.eade}</button>
        <div className="link-container">
          <Link to="/signup"> SIGN UP</Link>
          <Link to="/signin"> SIGN IN </Link>
          <Link to="/recommendations"> RECOMMENDATIONS </Link>
          <Link to="/user/:id"> EXTERNAL PROF </Link>
        </div>

        <button onClick={this.toggleModal}> SEND REX </button>
        {modalOpen && <Modal toggleModal={this.toggleModal} />}

        <FavouriteFilms />
      </div>
    );
  }
}


export const ProfilePageConnected = connect(
  (state)=>{
    return {
      eade: state.counter
    }

}, 
  (dispatch)=> {
    return {
      incrementByFive: () => dispatch(increment(5))
    }

})(ProfilePage)
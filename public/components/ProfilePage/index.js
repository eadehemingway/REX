import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from './Modal';

export class ProfilePage extends React.Component {
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
        <h1> profile page</h1>

        <div className="link-container">
          <Link to="/signup"> SIGN UP</Link>
          <Link to="/signin"> SIGN IN </Link>
          <Link to="/recommendations"> RECOMMENDATIONS </Link>
          <Link to="/user/:id"> EXTERNAL PROF </Link>
        </div>
        <button onClick={this.toggleModal}> SEND REX </button>
        {modalOpen && <Modal toggleModal={this.toggleModal} />}
      </div>
    );
  }
}

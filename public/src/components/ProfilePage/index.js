import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Modal } from './Modal';
import { FavouriteFilms } from './FavouriteFilms';
import { AddFavFilmDropDownConnected } from './AddFavFilmDropDown';
import axios from 'axios';

class ProfilePage extends React.Component {
  state = {
    modalOpen: false,
    userObj: null,
    favFilms: []
  };

  componentDidMount() {
    console.log('UESR NAME', this.props.userPage);
    axios.get(`/api/user/${this.props.userPage}`).then(res => {
      console.log('DATA', res.data);
      this.setState({ favFilms: res.data.doc.films });
    });
  }

  addFilm = newFilm => {
    const newFilmArr = [...this.state.favFilms, newFilm];
    this.setState({ favFilms: newFilmArr });
  };
  toggleModal = () => {
    const { modalOpen } = this.state;
    this.setState({ modalOpen: !modalOpen });
  };

  render() {
    const { modalOpen } = this.state;
    console.log('FAV', this.state.favFilms);
    return (
      <div className="page-content">
        <div className="link-container">
          <Link to="/recommendations"> RECOMMENDATIONS </Link>
        </div>
        <h1> {this.props.userPage}</h1>
        <button type="button" onClick={this.toggleModal}>
          SEND REX
        </button>
        {modalOpen && <Modal toggleModal={this.toggleModal} />}
        {this.state.favFilms.length > 0 && (
          <FavouriteFilms films={this.state.favFilms} />
        )}
        <AddFavFilmDropDownConnected addFilm={this.addFilm} />
      </div>
    );
  }
}

export const ProfilePageConnected = connect(state => {
  return {
    userPage: state.userPage
  };
})(ProfilePage);

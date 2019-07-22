import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from './Modal';
import { AddFavFilmDropDown } from './AddFavFilmDropDown';

export class FavouriteFilms extends React.Component {
  state = {
    showAddFilmDropDown: false
  };
  toggleDropDown = () => {
    this.setState({ showAddFilmDropDown: !this.state.showAddFilmDropDown });
  };

  render() {
    const { showAddFilmDropDown } = this.state;
    return (
      <div>
        <h2> Favourite films</h2>
        <button onClick={this.toggleDropDown}> add new</button>
        {showAddFilmDropDown && <AddFavFilmDropDown />}
      </div>
    );
  }
}

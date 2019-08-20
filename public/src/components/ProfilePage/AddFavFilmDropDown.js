import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class AddFavFilmDropDown extends React.Component {
  state = {
    modalOpen: false,
    value: '',
    filmInfo: [],
    showDropDown: false
  };

  getMovies = title => {
    this.setState({ value: title, showDropDown: true });
    axios.get(`/api/film/${title}`).then(res => {
      this.setState({ filmInfo: res.data.filmInfo });
    });
  };

  addFavFilm = filmInfo => {
    this.setState({ showDropDown: false });
    this.props.addFilm(filmInfo);
    axios.patch('/api/film', {
      handle: this.props.currentUser,
      filmInfo
    });
  };

  render() {
    const { filmInfo, showDropDown, value } = this.state;
    return (
      <div className="add-film-drop-down">
        <input
          type="text"
          value={value}
          onChange={e => this.getMovies(e.target.value)}
        />

        <button> add</button>
        {showDropDown &&
          filmInfo &&
          filmInfo.map(t => (
            <button key={t.poster_path} onClick={() => this.addFavFilm(t)}>
              <img
                className="drop-down-image"
                src={`https://image.tmdb.org/t/p/w185/${t.poster_path}`}
              />
              <li className="auto-complete-list">{t.title}</li>
            </button>
          ))}
      </div>
    );
  }
}

export const AddFavFilmDropDownConnected = connect(state => ({
  currentUser: state.currentUser
}))(AddFavFilmDropDown);

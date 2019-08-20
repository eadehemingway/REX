import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

class AddFavFilmDropDown extends React.Component {
  state = {
    modalOpen: false,
    value: '',
    filmInfo: [],
    favFilmList: [],
    showDropDown: false
  }

  getMovies = title => {
    this.setState({ value: title, showDropDown: true })
    axios.get(`/api/film/${title}`).then(res => {
      this.setState({ filmInfo: res.data.filmInfo })
    })
  }

  addFavFilm = filmInfo => {
    const favFilmList = [...this.state.favFilmList, filmInfo]
    this.setState({ favFilmList, showDropDown: false })

    axios.patch('/api/film', {
      handle: this.props.currentUser,
      filmInfo
    })
  }

  render() {
    const { favFilmList, filmInfo, showDropDown, value } = this.state

    return (
      <div className="add-film-drop-down">
        <input
          type="text"
          value={value}
          onChange={e => this.getMovies(e.target.value)}
        />

        <button> add</button>
        {showDropDown &&
          filmInfo.map(t => (
            <button key={t.title} onClick={() => this.addFavFilm(t)}>
              <img
                className="drop-down-image"
                src={`https://image.tmdb.org/t/p/w185/${t.poster_path}`}
              />
              <li className="auto-complete-list">{t.title}</li>
            </button>
          ))}

        {favFilmList &&
          favFilmList.map(f => (
            <div key={f.title}>
              <h1> {f.title}</h1>
              <img src={`https://image.tmdb.org/t/p/w185/${f.poster_path}`} />
            </div>
          ))}
      </div>
    )
  }
}

export const AddFavFilmDropDownConnected = connect(state => ({
  currentUser: state.currentUser
}))(AddFavFilmDropDown)

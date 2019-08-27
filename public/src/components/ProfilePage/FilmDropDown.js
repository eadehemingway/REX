import React from 'react'
import axios from 'axios'
import './style.css'

export class FilmDropDown extends React.Component {
  state = {
    value: '',
    filmInfo: [],
    showDropDown: false
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOut, false)
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOut, false)
  }

  handleClickOut = e => {
    if (this.filmDropDown && this.filmDropDown.contains(e.target)) {
      return
    }
    this.setState({ showDropDown: false })
  }
  getMovies = title => {
    if (title === '') {
      this.setState({ value: title, showDropDown: false })
      return
    }
    this.setState({ value: title, showDropDown: true })
    axios.get(`/api/film/${title}`).then(res => {
      this.setState({ filmInfo: res.data.filmInfo })
    })
  }

  selectFilm = film => {
    this.props.selectFilm(film)
    this.setState({ showDropDown: false })
  }
  render() {
    const { filmInfo, value, showDropDown } = this.state
    const { selectedFilm, deleteSelectedFilm } = this.props

    return (
      <div>
        <label htmlFor="film" className="film-dropdown-label">
          Film
        </label>
        <input
          id="film"
          type="text"
          placeholder="Add a film"
          value={value}
          className="film-dropdown-input text-input"
          onChange={e => this.getMovies(e.target.value)}
        />
        <div
          className="film-drop-down-container"
          ref={filmDropDown => (this.filmDropDown = filmDropDown)}
        >
          {showDropDown &&
            filmInfo.map(t => (
              <button
                className="dropdown-list-item interactive"
                key={t.poster_path}
                onClick={() => this.selectFilm(t)}
              >
                <img
                  className="drop-down-image"
                  src={`https://image.tmdb.org/t/p/w185/${t.poster_path}`}
                />
                <li className="auto-complete-list">{t.title}</li>
              </button>
            ))}
        </div>

        {selectedFilm && (
          <div>
            <img
              className="drop-down-image"
              src={`https://image.tmdb.org/t/p/w185/${selectedFilm.poster_path}`}
            />
            <button className="button" onClick={deleteSelectedFilm}>
              remove
            </button>
            <li className="auto-complete-list">{selectedFilm.title}</li>
          </div>
        )}
      </div>
    )
  }
}

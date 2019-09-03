import React from 'react'
import axios from 'axios'
import './style.css'
import SearchIcon from '../../assets/search.svg'

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
    this.setState({ showDropDown: false, value: '' })
  }
  render() {
    const { filmInfo, value, showDropDown } = this.state
    const { selectedFilm, deleteSelectedFilm } = this.props

    return (
      <div>
        <label htmlFor="film" className="form-label">
          Film
        </label>

        <div className="film-search-container">
          <input
            id="film"
            type="text"
            placeholder="Add a film"
            value={value}
            className="form-input"
            onChange={e => this.getMovies(e.target.value)}
            autocomplete="off"
          />
          <img src={SearchIcon} className="dropdown-search-icon" />

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
                  {t.poster_path ? (
                    <img
                      className="film-drop-down-image"
                      src={`https://image.tmdb.org/t/p/w185/${t.poster_path}`}
                    />
                  ) : (
                    <div className="drop-down-empty-poster">No image</div>
                  )}

                  <h2 className="film-drop-down-title">{t.title}</h2>
                </button>
              ))}
          </div>
        </div>

        {selectedFilm && (
          <div className="selected-film-container">
            <img
              className="film-drop-down-image"
              src={`https://image.tmdb.org/t/p/w185/${selectedFilm.poster_path}`}
            />

            <h2 className="selected-film-title">{selectedFilm.title}</h2>

            <button
              className="remove-selected-film button"
              onClick={deleteSelectedFilm}
            >
              x
            </button>
          </div>
        )}
      </div>
    )
  }
}

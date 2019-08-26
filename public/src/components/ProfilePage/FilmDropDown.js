import React from 'react'
import axios from 'axios'

export class FilmDropDown extends React.Component {
  state = {
    value: '',
    filmInfo: [],
    showDropDown: false,
    selectedFilm: null
  }

  getMovies = title => {
    this.setState({ value: title, showDropDown: true })
    axios.get(`/api/film/${title}`).then(res => {
      this.setState({ filmInfo: res.data.filmInfo })
    })
  }

  selectFilm = film => {
    this.props.selectFilm(film)
    this.setState({ showDropDown: false, selectedFilm: film })
  }
  render() {
    const { filmInfo, value, showDropDown, selectedFilm } = this.state
    return (
      <div>
        <input
          type="text"
          placeholder="film name"
          value={value}
          onChange={e => this.getMovies(e.target.value)}
        />
        {showDropDown &&
          filmInfo.map(t => (
            <button key={t.poster_path} onClick={() => this.selectFilm(t)}>
              <img
                className="drop-down-image"
                src={`https://image.tmdb.org/t/p/w185/${t.poster_path}`}
              />
              <li className="auto-complete-list">{t.title}</li>
            </button>
          ))}

        {selectedFilm && (
          <div>
            <img
              className="drop-down-image"
              src={`https://image.tmdb.org/t/p/w185/${selectedFilm.poster_path}`}
            />
            <li className="auto-complete-list">{selectedFilm.title}</li>
          </div>
        )}
      </div>
    )
  }
}

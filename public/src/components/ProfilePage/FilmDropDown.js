import React from 'react'
import axios from 'axios'

export class FilmDropDown extends React.Component {
  state = {
    value: '',
    filmInfo: []
  }

  getMovies = title => {
    this.setState({ value: title })
    axios.get(`/api/film/${title}`).then(res => {
      this.setState({ filmInfo: res.data.filmInfo })
    })
  }

  render() {
    const { filmInfo, value } = this.state
    return (
      <div>
        <input
          type="text"
          placeholder="film name"
          value={value}
          onChange={e => this.getMovies(e.target.value)}
        />
        {filmInfo &&
          filmInfo.map(t => (
            <button
              key={t.poster_path}
              onClick={() => this.props.selectFilm(t)}
            >
              <img
                className="drop-down-image"
                src={`https://image.tmdb.org/t/p/w185/${t.poster_path}`}
              />
              <li className="auto-complete-list">{t.title}</li>
            </button>
          ))}
      </div>
    )
  }
}

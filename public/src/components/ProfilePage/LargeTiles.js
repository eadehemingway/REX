import React from 'react'
import { FilledLargeTile } from './FilledLargeTile'
import { EmptyLargeTile } from './EmptyLargeTile'
import './style.css'
import axios from 'axios'

export class LargeTiles extends React.Component {
  state = {
    topFilms: []
  }
  componentDidMount() {
    this.setState({ topFilms: this.props.topFilms })
  }
  addTopFilm = newFilm => {
    const newFilmWithTag = { ...newFilm, tag: [{ colour: '', name: 'TOP' }] }
    const newFilmArr = [...this.state.topFilms, newFilmWithTag]
    this.setState({ topFilms: newFilmArr })

    axios
      .patch('/api/film', {
        handle: this.props.signedInUser,
        filmInfo: newFilmWithTag
      })
      .catch(e => console.log('ERROR ADDING FILM', e))
  }
  render() {
    const { topFilms } = this.state
    const maxNumTopFilms = 4
    const emptyTilesNeeded = maxNumTopFilms - topFilms.length
    const emptyTileArray = [...Array(emptyTilesNeeded)].map((_, i) => i)
    return (
      <div className="large-film-container">
        {topFilms.map((f, i) => (
          <FilledLargeTile film={f} key={i} />
        ))}
        {emptyTileArray.map(i => (
          <EmptyLargeTile key={i} addTopFilm={this.addTopFilm} />
        ))}
      </div>
    )
  }
}

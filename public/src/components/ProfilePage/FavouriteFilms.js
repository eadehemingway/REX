import React from 'react'
import { LargeTiles } from './LargeTiles'
import { SmallTiles } from './SmallTiles'

import './style.css'

export class FavouriteFilms extends React.Component {
  render() {
    const { films, deleteFilm, editMode, addFilm } = this.props

    const topFilms = films.filter(f => f.tag === 'topFilm')
    return (
      <div>
        <LargeTiles topFilms={topFilms} addFilm={addFilm} />
        <SmallTiles films={films} />
      </div>
    )
  }
}

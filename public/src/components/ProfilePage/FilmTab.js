import React from 'react'
import { LargeTiles } from './LargeTiles'
import { SmallTiles } from './SmallTiles'

import './style.css'

export class FilmTab extends React.Component {
  render() {
    const { films, deleteFilm, editMode } = this.props
    console.log('films:', films)

    const topFilms = films.filter(f => f.tag === 'topFilm')
    return (
      <div>
        <LargeTiles topFilms={topFilms} />
        <SmallTiles films={films} />
      </div>
    )
  }
}

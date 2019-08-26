import React from 'react'
import { LargeTiles } from './LargeTiles'
import { SmallTiles } from './SmallTiles'

import './style.css'

export class FavouriteFilms extends React.Component {
  render() {
    const { films, deleteFilm, editMode } = this.props
    // do filter to get the large films
    return (
      <div>
        <LargeTiles topFilms={[]} />
        <SmallTiles films={films} />
      </div>
    )
  }
}

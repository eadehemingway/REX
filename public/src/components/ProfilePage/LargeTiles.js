import React from 'react'
import { FilledLargeTile } from './FilledLargeTile'
import { EmptyLargeTile } from './EmptyLargeTile'
import './style.css'

export class LargeTiles extends React.Component {
  render() {
    const { topFilms } = this.props

    const maxNumTopFilms = 4
    const emptyTilesNeeded = maxNumTopFilms - topFilms.length
    const emptyTileArray = [...Array(emptyTilesNeeded)].map((_, i) => i)
    return (
      <div className="large-film-container">
        {topFilms.map((f, i) => (
          <FilledLargeTile film={f} key={i} />
        ))}
        {emptyTileArray.map(i => (
          <EmptyLargeTile key={i} />
        ))}
      </div>
    )
  }
}

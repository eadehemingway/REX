import React from 'react'
import { FilledLargeTile } from './FilledLargeTile'
import { EmptyLargeTile } from './EmptyLargeTile'
import './style.css'

export class LargeTiles extends React.Component {
  render() {
    const { topFilms } = this.props

    return (
      <div className="films">
        {topFilms.length > 0 ? (
          <FilledLargeTile topFilms={[]} />
        ) : (
          <div className="empty-tile-container">
            <EmptyLargeTile />
            <EmptyLargeTile />
            <EmptyLargeTile />
            <EmptyLargeTile />
          </div>
        )}
      </div>
    )
  }
}

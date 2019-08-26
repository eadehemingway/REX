import React from 'react'
import './style.css'

export class EmptyLargeTile extends React.Component {
  addTopFilm = () => {}
  render() {
    return (
      <button onClick={this.addTopFilm} className="empty-tile-btn">
        +
      </button>
    )
  }
}

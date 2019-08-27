import React from 'react'
import { FilmTile } from './FilmTile'
import { EmptyLargeTile } from './EmptyLargeTile'
import './style.css'

export class LargeTiles extends React.Component {
  render() {
    const { topFilms, addTopFilm, editMode, deleteFilm, openModal } = this.props
    const maxNumTopFilms = 4
    const emptyTilesNeeded = maxNumTopFilms - topFilms.length
    const emptyTileArray = [...Array(emptyTilesNeeded)].map((_, i) => i)
    return (
      <div className="large-film-container">
        {topFilms.map((f, i) => (
          <FilmTile
            film={f}
            key={i}
            editMode={editMode}
            deleteFilm={deleteFilm}
            openModal={openModal}
            containerClass="large-film-tile"
          />
        ))}
        {editMode &&
          emptyTileArray.map(i => (
            <EmptyLargeTile key={i} addTopFilm={addTopFilm} />
          ))}
      </div>
    )
  }
}

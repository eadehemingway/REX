import React from 'react'
import { FilmTile } from './FilmTile'
import { EmptyLargeTile } from './EmptyLargeTile'
import './style.css'

export class LargeTiles extends React.Component {
  render() {
    const {
      topFilms,
      addTopFilm,
      editMode,
      deleteFilm,
      openSendRexModal
    } = this.props
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
            openSendRexModal={openSendRexModal}
            containerClass="large-film-tile"
            imageClass="large-film-tile"
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

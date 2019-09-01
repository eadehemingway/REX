import React from 'react'
import './style.css'
import { FilmTile } from './FilmTile'
import Plus from './../../../assets/plus.svg'
export class TagGroup extends React.Component {
  state = {}

  render() {
    const {
      tag,
      filmsWithThisTag,
      editMode,
      deleteFilm,
      openSendRexModal
    } = this.props
    console.log(Plus)
    const tagName = tag ? tag.name : 'No Tag'
    const colour = tag ? tag.colour : 'lightgrey'
    return (
      <div className="tag-group-container">
        <div
          className="tag-title-container"
          style={{
            border: `1px solid ${colour}`
          }}
        >
          <h3 className="tag-title">{tagName}</h3>
        </div>
        <div className="tag-group-film-container">
          {filmsWithThisTag.map((f, i) => {
            return (
              <div key={i}>
                <FilmTile
                  film={f}
                  editMode={editMode}
                  deleteFilm={deleteFilm}
                  openSendRexModal={openSendRexModal}
                  containerClass="cropped-to-square"
                  imageClass="small-film-tile"
                />
              </div>
            )
          })}

          <button
            className="interactive"
            onClick={() => this.props.openAddFilmModal(tag)}
          >
            <img src={Plus} className="plus-icon" />
          </button>
        </div>
      </div>
    )
  }
}

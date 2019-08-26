import React from 'react'
import './style.css'

export class FilledLargeTile extends React.Component {
  render() {
    const { film, editMode, deleteFilm, openModal } = this.props

    return (
      <div>
        <img
          className="large-film-img"
          src={`https://image.tmdb.org/t/p/w185/${film.poster_path}`}
        />
        {/* <p>{title}</p> */}
        {/* {tag.length > 0 &&
              tag.map((t, i) => (
                <p key={i} style={{ background: t.colour }}>
                  {t.name}
                </p>
              ))} */}

        {editMode && (
          <button onClick={() => deleteFilm(film._id)}>delete</button>
        )}
        <button onClick={() => openModal(film)}>recommend this film</button>
      </div>
    )
  }
}

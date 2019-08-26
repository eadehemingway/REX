import React from 'react'
import './style.css'

export class FilledLargeTile extends React.Component {
  render() {
    const { film } = this.props
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

        {/* {editMode && (
              <button onClick={() => deleteFilm(_id)}>delete</button>
            )}
            <button
              onClick={() => this.props.openModal({ title, poster_path })}
            >
              recommend this film
            </button> */}
      </div>
    )
  }
}

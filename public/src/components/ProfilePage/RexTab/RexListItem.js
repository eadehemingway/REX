import React from 'react'

export class RexListItem extends React.Component {
  state = {}

  render() {
    const { rex, inApprovedTab, toggleRexApproval, deleteRex } = this.props

    return (
      <div className="rex-list-item">
        <img
          className="rex-img"
          src={`https://image.tmdb.org/t/p/w185/${rex.filmInfo.poster_path}`}
        />
        <div className="rex-list-item-info">
          <h2 className="rex-info-title">{rex.filmInfo.title}</h2>
          <p className="rex-info-from">From @{rex.fromHandle}</p>
          {rex.comment.length > 0 && (
            <p className="rex-info-comment"> "{rex.comment}"</p>
          )}
        </div>
        <div className="rex-list-button-container">
          <button
            className="rex-list-button button"
            onClick={() => toggleRexApproval(rex._id)}
          >
            {inApprovedTab ? 'unapprove' : 'approve'}
          </button>
          <button
            className="rex-list-button button"
            onClick={() => deleteRex(rex._id)}
          >
            delete
          </button>
        </div>
      </div>
    )
  }
}

import React from 'react'

export class RexListItem extends React.Component {
  state = {}

  render() {
    const { rex, inApprovedTab, toggleRexApproval } = this.props

    return (
      <div>
        <p>{rex.filmInfo.title}</p>
        <p> comment: {rex.comment}</p>
        <p> recommendation from : {rex.fromHandle}</p>
        <img
          className="drop-down-image"
          src={`https://image.tmdb.org/t/p/w185/${rex.filmInfo.poster_path}`}
        />

        <div>
          <button onClick={() => toggleRexApproval(rex._id)}>
            {inApprovedTab ? 'unapprove' : 'approve'}
          </button>
          <button onClick={() => deleteRex(rex._id)}>delete</button>
        </div>
      </div>
    )
  }
}

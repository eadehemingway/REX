import React from 'react'

export class RexListItem extends React.Component {
  state = {}

  render() {
    const { rex, inApprovedTab, toggleRexApproval } = this.props

    return (
      <div className="rex-list-item">
        <img
          className="rex-img"
          src={`https://image.tmdb.org/t/p/w185/${rex.filmInfo.poster_path}`}
        />
        <div className="rex-list-item-info">
          <p className="rex-info-p-tag">{rex.filmInfo.title}</p>
          <p className="rex-info-p-tag"> comment: {rex.comment}</p>
          <p className="rex-info-p-tag">
            {' '}
            recommendation from : {rex.fromHandle}
          </p>

          <div>
            <button onClick={() => toggleRexApproval(rex._id)}>
              {inApprovedTab ? 'unapprove' : 'approve'}
            </button>
            <button onClick={() => deleteRex(rex._id)}>delete</button>
          </div>
        </div>
      </div>
    )
  }
}

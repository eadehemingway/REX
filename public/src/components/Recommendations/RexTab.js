import React from 'react'
import axios from 'axios'

export class RexTab extends React.Component {
  state = {
    inApprovedTab: true
  }
  // router.delete('/api/rex/:id', isAuthenticated, deleteRex)

  approveRex = id => {
    axios.patch(`/api/rex/${id}/status`)
    this.props.changeStatus(id)
  }
  removeRex = id => {
    axios.delete(`/api/rex/${id}`)
    this.props.removeRex(id)
  }
  render() {
    const { inApprovedTab, rex } = this.props
    const pendingRex = rex.filter(r => r.pending)
    const approvedRex = rex.filter(r => !r.pending)
    const rexToShow = inApprovedTab ? approvedRex : pendingRex
    return (
      <section className="page-content">
        <h2> {inApprovedTab ? 'approved' : 'pending'} Recommendation</h2>
        <ul>
          {rexToShow.length > 0 &&
            rexToShow.map((r, i) => {
              return (
                <div key={i}>
                  <li> {r.filmInfo.title}</li>
                  <img
                    className="drop-down-image"
                    src={`https://image.tmdb.org/t/p/w185/${r.filmInfo.poster_path}`}
                  />
                  {inApprovedTab ? (
                    <button onClick={() => this.removeRex(r._id)}>
                      remove
                    </button>
                  ) : (
                    <div>
                      <button onClick={() => this.approveRex(r._id)}>
                        approve
                      </button>
                      <button onClick={() => this.removeRex(r._id)}>
                        dismiss
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
        </ul>
      </section>
    )
  }
}

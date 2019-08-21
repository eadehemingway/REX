import React from 'react'

export class PendingRexTab extends React.Component {
  state = {
    inApprovedTab: true
  }

  render() {
    return (
      <section className="page-content">
        <h2> PENDING Recommendation</h2>
        <ul>
          {this.props.rex.length > 0 &&
            this.props.rex.map((r, i) => {
              return (
                <div key={i}>
                  <li> {r.filmInfo.title}</li>
                  <img
                    className="drop-down-image"
                    src={`https://image.tmdb.org/t/p/w185/${r.filmInfo.poster_path}`}
                  />
                </div>
              )
            })}
        </ul>
      </section>
    )
  }
}

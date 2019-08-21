import React, { Component } from 'react'

export class PendingRexTab extends React.Component {
  state = {
    inApprovedTab: true
  }

  render() {
    return (
      <section className="page-content">
        <h2> PENDING Recommendation</h2>
        <ul>
          {this.props.rex.length > 1 &&
            this.props.rex.map(r => <li key={r}> {r}</li>)}
        </ul>
      </section>
    )
  }
}

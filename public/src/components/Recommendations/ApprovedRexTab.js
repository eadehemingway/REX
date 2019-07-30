import React, { Component } from 'react'

export class ApprovedRexTab extends React.Component {
  state = {
    inApprovedTab: true
  }

  render() {
    return (
      <section className="page-content">
        <h2> APPROVED Recommendation</h2>

        <ul>
          <li>one</li>
          <li>one</li>
          <li>one</li>
          <li>one</li>
        </ul>
      </section>
    )
  }
}

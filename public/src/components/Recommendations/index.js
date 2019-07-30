import React, { Component } from 'react'
import { ApprovedRexTab } from './ApprovedRexTab'
import { PendingRexTab } from './PendingRexTab'

export class Recommendations extends React.Component {
  state = {
    inApprovedTab: true
  }

  toggleInApprovedTab = () => {
    this.setState({ inApprovedTab: !this.state.inApprovedTab })
  }

  render() {
    const { inApprovedTab } = this.state
    return (
      <section className="page-content">
        <button onClick={this.toggleInApprovedTab}> go to pending</button>

        {inApprovedTab ? <ApprovedRexTab /> : <PendingRexTab />}
      </section>
    )
  }
}

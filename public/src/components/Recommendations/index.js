import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { ApprovedRexTab } from './ApprovedRexTab'
import { PendingRexTab } from './PendingRexTab'

class Recommendations extends React.Component {
  state = {
    inApprovedTab: true,
    pendingRex: [],
    approvedRex: []
  }

  componentDidMount() {
    const { signedInUser } = this.props
    axios.get(`/api/user/${signedInUser}`).then(response => {
      const rex = response.data.doc.rex
      const pendingRex = rex.filter(r => r.pending)
      const approvedRex = rex.filter(r => !r.pending)
      this.setState({ pendingRex, approvedRex })
    })
  }

  toggleInApprovedTab = () => {
    this.setState({ inApprovedTab: !this.state.inApprovedTab })
  }

  render() {
    const { inApprovedTab, approvedRex, pendingRex } = this.state
    return (
      <section className="page-content">
        <button onClick={this.toggleInApprovedTab}> go to pending</button>

        {inApprovedTab ? (
          <ApprovedRexTab rex={approvedRex} />
        ) : (
          <PendingRexTab rex={pendingRex} />
        )}
      </section>
    )
  }
}

export const RecommendationsConnected = connect(state => {
  return {
    signedInUser: state.signedInUser
  }
})(Recommendations)

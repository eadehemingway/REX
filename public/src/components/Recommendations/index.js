import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

import { RexTab } from './RexTab'

class Recommendations extends React.Component {
  state = {
    inApprovedTab: true,
    rex: []
  }

  componentDidMount() {
    const { signedInUser } = this.props
    axios.get(`/api/user/${signedInUser}`).then(response => {
      const rex = response.data.doc.rex
      this.setState({ rex })
    })
  }

  toggleInApprovedTab = () => {
    this.setState({ inApprovedTab: !this.state.inApprovedTab })
  }

  deleteRexFromState = id => {
    const { rex } = this.state
    const newRex = [...rex].filter(r => r._id !== id)
    this.setState({ rex: newRex })
  }
  changeStatusInState = id => {
    const { rex } = this.state
    const newRex = rex.map(r => {
      if (r._id === id) {
        return {
          ...r,
          pending: !r.pending
        }
      } else {
        return r
      }
    })
    this.setState({ rex: newRex })
  }
  render() {
    const { inApprovedTab, rex } = this.state

    return (
      <section className="page-content">
        <button onClick={this.toggleInApprovedTab}>
          go to {inApprovedTab ? 'pending' : 'approved'}
        </button>

        <RexTab
          rex={rex}
          inApprovedTab={inApprovedTab}
          changeStatusInState={this.changeStatusInState}
          deleteRex={this.deleteRexFromState}
        />
      </section>
    )
  }
}

export const RecommendationsConnected = connect(state => {
  return {
    signedInUser: state.signedInUser
  }
})(Recommendations)

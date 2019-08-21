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

  removeRexFromState = id => {}
  changeStatusInState = id => {}
  render() {
    const { inApprovedTab, rex } = this.state
    return (
      <section className="page-content">
        <button onClick={this.toggleInApprovedTab}>
          {' '}
          go to {inApprovedTab ? 'pending' : 'approved'}
        </button>

        <RexTab
          rex={rex}
          inApprovedTab={inApprovedTab}
          changeStatus={this.changeStatusInState}
          removeRex={this.removeRexFromState}
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

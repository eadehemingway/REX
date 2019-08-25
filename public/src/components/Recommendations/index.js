import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import './styles.css'

import { RexTab } from './RexTab'

class Recommendations extends React.Component {
  state = {
    rex: [],
    selectedTab: 'Approved'
  }

  componentDidMount() {
    const { signedInUser } = this.props
    axios.get(`/api/user/${signedInUser}`).then(response => {
      const rex = response.data.doc.rex
      this.setState({ rex })
    })
  }

  changeSelectedTab = value => {
    this.setState({
      selectedTab: value
    })
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
    const { selectedTab, rex } = this.state

    return (
      <section className="page-content">
        <button
          onClick={() => this.changeSelectedTab('Approved')}
          className={`tab-header ${selectedTab === 'Approved' &&
            'selectedTab'}`}
        >
          Approved
        </button>
        <button
          onClick={() => this.changeSelectedTab('Pending')}
          className={`tab-header ${selectedTab === 'Pending' && 'selectedTab'}`}
        >
          Pending
        </button>
        <RexTab
          rex={rex}
          selectedTab={selectedTab}
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

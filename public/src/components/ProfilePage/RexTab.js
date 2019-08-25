import React from 'react'
import axios from 'axios'
import { RexListItem } from './RexListItem'
export class RexTab extends React.Component {
  toggleRexApproval = id => {
    axios.patch(`/api/rex/${id}/status`)
    this.props.changeStatusInState(id)
  }
  deleteRex = id => {
    axios.delete(`/api/rex/${id}`)
    this.props.deleteRex(id)
  }
  render() {
    const { rex, inApprovedTab } = this.props

    const pendingRex = rex.filter(r => r.pending)
    const approvedRex = rex.filter(r => !r.pending)
    const rexToShow = inApprovedTab ? approvedRex : pendingRex

    return (
      <section>
        {rexToShow.length > 0 &&
          rexToShow.map((r, i) => {
            return (
              <RexListItem
                key={i}
                rex={r}
                toggleRexApproval={this.toggleRexApproval}
                deleteRex={this.deleteRex}
                inApprovedTab={inApprovedTab}
              />
            )
          })}
      </section>
    )
  }
}
